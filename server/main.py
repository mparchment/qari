from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import os
import time
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AudioFile(BaseModel):
    id: str
    title: str
    file_path: str

class Collection(BaseModel):
    name: str
    audio_files: List[AudioFile]

class Reciter(BaseModel):
    id: str
    name: str
    bio: str
    collections: List[Collection]

class Playlist(BaseModel):
    id: str
    name: str
    audio_file: str

# Cache and biographies
_cache = {
    "reciters": None,
    "last_updated": None
}
CACHE_TIMEOUT = 60 * 5  # Cache timeout in seconds (e.g., 5 minutes)
BIOGRAPHIES_FILE = "biographies.json"

def should_refresh_cache() -> bool:
    """Determine if the cache should be refreshed based on timeout."""
    return _cache["reciters"] is None or (time.time() - _cache["last_updated"] > CACHE_TIMEOUT)

def load_biographies():
    """Load biographies from the JSON file."""
    try:
        with open(BIOGRAPHIES_FILE, 'r') as file:
            biographies = json.load(file)
            print("Loaded biographies:", biographies)  # Add this line
            return biographies
    except Exception as e:
        print(f"Error loading biographies: {e}")
        return {}


def get_reciters_from_directory():
    base_path = "C:/Users/micha/Documents/GitHub/qari/server/audio"
    biographies = load_biographies()
    reciters = []
    
    for reciter_name in os.listdir(base_path):
        reciter_path = os.path.join(base_path, reciter_name)
        if os.path.isdir(reciter_path):
            collections = {}
            for collection_name in os.listdir(reciter_path):
                collection_path = os.path.join(reciter_path, collection_name)
                if os.path.isdir(collection_path):
                    if collection_name not in collections:
                        collections[collection_name] = []
                    for audio_file in os.listdir(collection_path):
                        if audio_file.endswith(".mp3"):
                            collections[collection_name].append(AudioFile(
                                id=f"{reciter_name}-{collection_name}-{audio_file}",
                                title=audio_file.replace('.mp3', ''),
                                file_path=f"{reciter_name}/{collection_name}/{audio_file}"
                            ))
            
            reciter_collections = [
                Collection(name=name, audio_files=files)
                for name, files in collections.items()
            ]
            
            reciter_bio = biographies.get(reciter_name, f"Biography for {reciter_name.replace('-', ' ').title()}")
            reciters.append(Reciter(
                id=reciter_name,
                name=reciter_name.replace('-', ' ').title(),
                bio=reciter_bio,
                collections=reciter_collections
            ))
    
    return reciters


def get_cached_reciters():
    """Retrieve reciters from cache or refresh if needed."""
    if should_refresh_cache():
        _cache["reciters"] = get_reciters_from_directory()
        _cache["last_updated"] = time.time()
    return _cache["reciters"]

@app.get("/api/reciters")
async def get_reciters():
    reciters = get_cached_reciters()
    return [{"id": r.id, "name": r.name} for r in reciters]

@app.get("/api/reciters/{reciter_id}")
async def get_reciter(reciter_id: str):
    reciters = get_cached_reciters()
    reciter = next((r for r in reciters if r.id == reciter_id), None)
    if reciter is None:
        raise HTTPException(status_code=404, detail="Reciter not found")
    return reciter

@app.get("/api/audio/{reciter_name}/{collection_name}/{audio_file}")
async def get_audio(reciter_name: str, collection_name: str, audio_file: str):
    audio_path = f"C:/Users/micha/Documents/GitHub/qari/server/audio/{reciter_name}/{collection_name}/{audio_file}"
    if not os.path.exists(audio_path):
        raise HTTPException(status_code=404, detail="Audio file not found")
    return FileResponse(audio_path, media_type="audio/mpeg")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
