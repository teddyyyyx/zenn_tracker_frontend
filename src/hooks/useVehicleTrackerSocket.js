import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useVehicleTrackerSocket() {
  const [position, setPosition] = useState([14.5995, 120.9842]); // Default: Manila
  const [trail, setTrail] = useState([]); // Trail of positions for Polyline

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Adjust if backend runs elsewhere

    socket.on("vehicle-location", ({ lat, lng }) => {
      const newPos = [lat, lng];
      setPosition(newPos);
      setTrail((prev) => [...prev, newPos]); // Append to trail

      console.log("📍 Received coordinates:", lat, lng);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { position, trail };
}
