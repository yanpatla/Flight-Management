import { Flight } from "@/models";
import { FlightStore, IFlightsStore } from "@/store";
import { createContext, ReactNode, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
export interface FlightContextState {
  flightStore?: IFlightsStore;
}
let socket: Socket;
export const FlightContext = createContext<FlightContextState>({});

const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [flightStore, setFlightStore] = useState<IFlightsStore>();

  useEffect(() => {
    if (!flightStore) {
      setFlightStore(new FlightStore());
    }

    socket = io(import.meta.env.VITE_BACKEND_URL);

    flightStore?.callGetFlights();
    socket.on("flight-update", (flights) => {
      let flight = flights as Flight;
      const newFlights = flightStore?.getFlights;
      if (flight && newFlights !== undefined) {
        newFlights[
          newFlights?.findIndex((el) => el.flightNumber === flight.flightNumber)
        ] = flight;
      }
    });
    return () => {
      socket.off("flight-update");
    };
  }, [flightStore]);
  return (
    <FlightContext.Provider value={{ flightStore }}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightProvider;
