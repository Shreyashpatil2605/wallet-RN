export const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://wallet-api-a1d7.onrender.com/api";

export const parseApiResponse = async (response) => {
  const body = await response.text();
  let data;

  try {
    data = body ? JSON.parse(body) : null;
  } catch {
    throw new Error(
      `The server returned an invalid response (${response.status}).`
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        `Request failed with status ${response.status}. Please try again later.`
    );
  }

  return data;
};