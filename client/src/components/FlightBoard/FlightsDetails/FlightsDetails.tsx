import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Flight } from "@/models";
export interface FlightsDetailsInterface {
  flight: Flight;
}

const FlightsDetails: React.FC<FlightsDetailsInterface> = ({ flight }) => {


  return (
    <>
      <tr>
        <td>{flight.flightNumber}</td>

        <td>{flight.status}</td>

        <td>{flight.takeoffTime}</td>

        <td>{flight.landingTime}</td>

        <td>{flight.takeoffAirport}</td>

        <td>{flight.landingAirport}</td>
        <td>a</td>
      </tr>
    </>
  );
};

export const FlightsDetailsStyle = styled.div``;

export default FlightsDetails;
