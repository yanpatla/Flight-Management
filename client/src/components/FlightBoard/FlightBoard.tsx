import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { FlightsDetails } from "./FlightsDetails";
import io, { Socket } from "socket.io-client";
import { useStore } from "@/hooks";
import { observer } from "mobx-react";
let socket: Socket;

export interface FlightBoardInterface {}
const FlightBoard: React.FC<FlightBoardInterface> = () => {
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
    <FlightBoardStyle>
      <header>FLIGHTS</header>

      <table>
        <thead>
          <tr>
            <th id="flight">FLIGHT</th>
            <th id="status">STATUS</th>
            <th id="takeoff-time">TAKEOFF TIME</th>
            <th id="landing-time">LANDING TIME</th>
            <th id="takeoff-destination">TAKEOFF DESTINATION</th>
            <th id="landing-destination">LANDING DESTINATION</th>
            <th id="delay">DELAY</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {flightStore.getFlights.map((flight) => (
            <FlightsDetails key={flight.flightNumber} flight={flight} />
          ))}
        </tbody>
      </table>
    </FlightBoardStyle>
  );
};

export const FlightBoardStyle = styled.div``;

export default observer(FlightBoard);
