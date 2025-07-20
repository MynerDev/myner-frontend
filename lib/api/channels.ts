export const saveChannels = async (channels: any[]) => {
  const response = await fetch('http://localhost:8000/api/channels/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ channels }),
  });

  if (!response.ok) {
    throw new Error('Failed to save channels');
  }

  return await response.json();
};
