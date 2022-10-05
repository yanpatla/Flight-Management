import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "@emotion/styled";
import Flight from "@/models/flights";
import usePrevious from "@/hooks/usePrevious";
import SplitText from "@/hooks/useSplitText";
export interface FlightsDetailsInterface {
  flight: Flight;
}

const FlightsDetails: React.FC<FlightsDetailsInterface> = ({ flight }) => {
  const prevCount: any = usePrevious(flight.takeoffTime);
  const memoizedValue = useMemo(() => flight.takeoffTime, [prevCount]);
  const timeDiffCalc = (currentDate: any, beforeDate: any) => {
    let diffInMilliSeconds = Math.abs(currentDate - beforeDate) / 1000;
    diffInMilliSeconds /= 60;
    const minutes = Math.abs(Math.round(diffInMilliSeconds));

    return minutes;
  };

  return (
    <>
      <tr>
        <SplitText str={flight.flightNumber} />

        <SplitText str={flight.status} />

        <SplitText str={flight.takeoffTime.toString()} />

        <SplitText str={flight.landingTime.toString()} />

        <SplitText str={flight.takeoffAirport} />

        <SplitText str={flight.landingAirport} />
        <td>
          {/* {isNaN(
            timeDiffCalc(
              Number(new Date(flight.takeoffTime).getTime()),
              Number(new Date(prevCount).getTime())
            )
          ) */}
          {/* ?  */}0
          {/* : timeDiffCalc(
                Number(new Date(flight.takeoffTime).getTime()),
                Number(new Date(prevCount).getTime())
              )} */}
        </td>
      </tr>
    </>
  );
};
const FlightsDetailsStyle = styled.div``;

export default FlightsDetails;
