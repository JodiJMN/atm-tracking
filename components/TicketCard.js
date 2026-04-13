"use client";

import { apiRequest } from "../lib/api";

export default function TicketCard({ ticket }) {

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => reject()
      );
    });
  };

const compressImage = (file, location) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      let width = img.width;
      let height = img.height;

      const MAX_WIDTH = 1280;

      if (width > MAX_WIDTH) {
        height = height * (MAX_WIDTH / width);
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // watermark
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, height - 60, width, 60);

      ctx.fillStyle = "white";
      ctx.font = "20px Arial";

      const text = `Time: ${new Date().toLocaleString()} | Lat: ${location.lat.toFixed(5)}, Lng: ${location.lng.toFixed(5)}`;

      ctx.fillText(text, 10, height - 20);

      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

      resolve(compressedBase64.split(",")[1]);
    };
  });
};

  const handlePickup = async (e) => {
    const file = e.target.files[0];
    const loc = await getLocation();
    const base64 = await compressImage(file, loc);

    const res = await apiRequest({
      action: "pickup",
      ticket_id: ticket[0],
      user_lat: loc.lat,
      user_lng: loc.lng,
      photo: base64,
      user: JSON.parse(localStorage.getItem("user")).name
    });

    alert(res.success ? "Pickup success" : res.message);
  };

  const handleDropoff = async (e) => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);
    const loc = await getLocation();

    const res = await apiRequest({
      action: "dropoff",
      ticket_id: ticket[0],
      user_lat: loc.lat,
      user_lng: loc.lng,
      photo: base64,
      user: JSON.parse(localStorage.getItem("user")).name
    });

    alert(res.success ? "Dropoff success" : res.message);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-3">
      <p><b>ID:</b> {ticket[0]}</p>
      <p><b>Status:</b> {ticket[2]}</p>

      {ticket[2] === "Assigned" && (
        <input type="file" onChange={handlePickup} />
      )}

      {ticket[2] === "In Transit" && (
        <input type="file" onChange={handleDropoff} />
      )}
    </div>
  );
}