import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Flight } from "@/models";
export interface FlightsDetailsInterface {
  flight: Flight;
}

const FlightsDetails: React.FC<FlightsDetailsInterface> = ({ flight }) => {
  function usePrevious(value: any) {
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
  const prevCount: any = usePrevious(flight.takeoffTime);

  function timeDiffCalc(dateFuture: any, dateNow: any) {
    console.log("date", dateFuture);
    console.log("ppee", dateNow);

    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    diffInMilliSeconds /= 60;
    console.log("milisecodns", diffInMilliSeconds);
    const minutes = Math.abs(Math.round(diffInMilliSeconds));
    return minutes;
  }

  return (
    <>
      <tr>
        <td>{flight.flightNumber}</td>

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
      </tr>
    </>
  );
};

export const FlightsDetailsStyle = styled.div``;

export default FlightsDetails;
