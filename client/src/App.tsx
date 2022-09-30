import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useStore } from "./hooks";
import io, { Socket } from "socket.io-client";
import { FlightBoard } from "./components";
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
    <div className="app">
      <FlightBoard />
    </div>
  );
}

export default observer(App);
