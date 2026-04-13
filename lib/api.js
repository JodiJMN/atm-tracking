const API_URL = "https://script.google.com/macros/s/AKfycbxwLqNWHkpUq8q-w8j2WgCcoW3sep6NNPsKUdIAuYJ8mdTobK02CiTd7TPMEutmJVJw/exec";

export async function apiRequest(data) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}