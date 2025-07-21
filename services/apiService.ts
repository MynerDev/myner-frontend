const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiGet = async (end_point: string) => {

  let url: string = API_BASE_URL + end_point;

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
