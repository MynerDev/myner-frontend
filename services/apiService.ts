export const apiGet = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("❌ API GET error:", error);
    throw error;
  }
};
