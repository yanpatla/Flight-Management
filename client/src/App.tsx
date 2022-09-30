import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useStore } from "./hooks";
import { Flight } from "./models";
import io, { Socket } from "socket.io-client";
let socket: Socket;
function App() {
  const {
    rootStore: { flightStore },
  } = useStore();
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);

    socket.on("flight-update", () => {
      flightStore.callGetFlights();
    });

    return () => {
      socket.off("flight-update");
    };
  }, []);
  return (
    <div className="pp">
      {flightStore.getFlights.map((el) => (
        <>
          <p>{el.status}</p>
          <p>{el.flightNumber}</p>
          <p>{el.takeoffAirport}</p>
          <p>{el.takeoffTime}</p>
          <p>{el.landingAirport}</p>
          <p>{el.landingTime}</p>
          <br />
        </>
      ))}
    </div>
  );
}

export default observer(App);
