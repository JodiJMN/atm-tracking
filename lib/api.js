const API_URL = "https://script.google.com/macros/s/AKfycbxwLqNWHkpUq8q-w8j2WgCcoW3sep6NNPsKUdIAuYJ8mdTobK02CiTd7TPMEutmJVJw/exec";

export async function apiRequest(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  return res.json();
}