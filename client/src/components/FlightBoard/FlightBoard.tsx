import React from "react";
import styled from "@emotion/styled";
import { FlightsDetails } from "./FlightsDetails";
export interface FlightBoardInterface {}

const FlightBoard: React.FC<FlightBoardInterface> = () => {
  return (
    <FlightBoardStyle>
      <header>FLIGHTS</header>

      <table>
        <thead>
          <th id="flight">FLIGHT</th>
          <th id="status">STATUS</th>
          <th id="takeoff-time">TAKEOFF TIME</th>
          <th id="landing-time">LANDING TIME</th>
          <th id="takeoff-destination">TAKEOFF DESTINATION</th>
          <th id="landing-destination">LANDING DESTINATION</th>
          <th id="delay">DELAY</th>
        </thead>
        <tbody id="table-body">
          <FlightsDetails />
        </tbody>
      </table>
    </FlightBoardStyle>
  );
};

export const FlightBoardStyle = styled.div``;

export default FlightBoard;
