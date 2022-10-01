import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Flight } from "@/models";
import usePrevious from "@/hooks/usePrevious";
export interface FlightsDetailsInterface {
  flight: Flight;
}

const FlightsDetails: React.FC<FlightsDetailsInterface> = ({ flight }) => {
  const prevCount: any = usePrevious(flight.takeoffTime);

  function timeDiffCalc(currentDate: any, beforeDate: any) {
    let diffInMilliSeconds = Math.abs(currentDate - beforeDate) / 1000;
    diffInMilliSeconds /= 60;
    const minutes = Math.abs(Math.round(diffInMilliSeconds));
    return minutes;
  }

  return (
    <>
      <Tr flight={flight}>
        <td>{flight.flightNumber}</td>
        {}
        <td>{flight.status}</td>

        <td>{flight.takeoffTime.toString()}</td>

        <td>{flight.landingTime.toString()}</td>

        <td>{flight.takeoffAirport}</td>

        <td>{flight.landingAirport}</td>
        <td>
          {isNaN(
            timeDiffCalc(
              new Date(flight.takeoffTime).getTime(),
              new Date(prevCount).getTime()
            )
          )
            ? 0
            : timeDiffCalc(
                new Date(flight.takeoffTime).getTime(),
                new Date(prevCount).getTime()
              )}
        </td>
      </Tr>
    </>
  );
};
const FlightsDetailsStyle = styled.div``;
const Tr = styled.tr<FlightsDetailsInterface>`
  background-color: ${({ flight }) =>
    flight?.status === "malfunction" ? "red" : "white"};
`;

export default FlightsDetails;
