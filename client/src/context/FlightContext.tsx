import { Flight } from "@/models";
import { FlightStore, IFlightsStore } from "@/store";
import { createContext, ReactNode, useEffect, useState } from "react";
export interface FlightContextState {
  flightStore?: IFlightsStore;
}
export const FlightContext = createContext<FlightContextState>({});

const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [flightStore, setFlightStore] = useState<IFlightsStore>();

  useEffect(() => {
    if (!flightStore) {
      setFlightStore(new FlightStore());
    }
    flightStore?.callGetFlights();
  }, [flightStore]);
  return (
    <FlightContext.Provider value={{ flightStore }}>
      {children}
    </FlightContext.Provider>
  );
};

export default FlightProvider;
