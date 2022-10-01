import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { FlightsDetails } from "../../components/FlightsDetails";
import io, { Socket } from "socket.io-client";
import { useStore } from "@/hooks";
import { observer } from "mobx-react";
let socket: Socket;

export interface FlightBoardInterface {}
const FlightBoard: React.FC<FlightBoardInterface> = () => {
  const [searchFlight, setSearchFlight] = useState<string>("");
  const {
    rootStore: { flightStore },
  } = useStore();
  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);

    socket.on("flight-update", () => {
      flightStore.callGetFlights();
    });
    flightStore.callGetFlight("ML0673");

    return () => {
      socket.off("flight-update");
    };
  }, []);

  const filteredFlights =
    searchFlight === ""
      ? flightStore.getFlights
      : flightStore.getFlights.filter(
          (flight) =>
            flight.flightNumber
              .toLowerCase()
              .includes(searchFlight.toLowerCase()) ||
            flight.landingAirport
              .toLowerCase()
              .includes(searchFlight.toLowerCase()) ||
            flight.takeoffAirport
              .toLowerCase()
              .includes(searchFlight.toLowerCase())
        );

  return (
    <FlightBoardStyle>
      <input type="search" onChange={(e) => setSearchFlight(e.target.value)} />

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
          {filteredFlights.map((flight) => (
            <FlightsDetails key={flight.flightNumber} flight={flight} />
          ))}
        </tbody>
      </table>
    </FlightBoardStyle>
  );
};

export const FlightBoardStyle = styled.div``;

export default observer(FlightBoard);
