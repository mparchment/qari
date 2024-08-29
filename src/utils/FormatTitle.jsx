export const formatTitle = (name) => {
    const parts = name.split('-');
    return parts
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };
  