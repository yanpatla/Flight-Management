import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Flight } from "@/models";
import usePrevious from "@/hooks/usePrevious";
import SplitText from "@/hooks/useSplitText";
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
        <SplitText str={flight.flightNumber} />

        <SplitText str={flight.status} />

        <SplitText str={flight.takeoffTime.toString()} />

        <SplitText str={flight.landingTime.toString()} />

        <SplitText str={flight.takeoffAirport} />

        <SplitText str={flight.landingAirport} />
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
