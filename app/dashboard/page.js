"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "../../lib/api";
import TicketCard from "../../components/TicketCard";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
  const user = localStorage.getItem("user");

    if (!user) {
      window.location.href = "/login";
    } else {
      loadTickets();
    }
  }, []);

  const loadTickets = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await apiRequest({
      action: "getTickets",
      page: 1,
      limit: 20,
      user: user.name
    });

    setTickets(res.data || []);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">My Tickets</h1>

      {tickets.map((t, i) => (
        <TicketCard key={i} ticket={t} />
      ))}
    </div>
  );
}