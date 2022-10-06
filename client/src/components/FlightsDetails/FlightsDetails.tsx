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
import io, { Socket } from "socket.io-client";
import { observer } from "mobx-react-lite";
export interface FlightsDetailsInterface {
  flight: Flight;
}
let socket: Socket;
const FlightsDetails: React.FC<FlightsDetailsInterface> = ({ flight }) => {
  // const prevCount: any = usePrevious(flight.takeoffTime);
  // const memoizedValue = useMemo(() => flight.takeoffTime, [prevCount]);
  // const timeDiffCalc = (currentDate: any, beforeDate: any) => {
  //   let diffInMilliSeconds = Math.abs(currentDate - beforeDate) / 1000;
  //   diffInMilliSeconds /= 60;
  //   const minutes = Math.abs(Math.round(diffInMilliSeconds));

  //   return minutes;
  // };
  // const [editClone] = useState(new Flight(flight));

  // useEffect(() => {
  //   socket.on("flight-update", (flights) => {
  //     io(import.meta.env.VITE_BACKEND_URL);

  //     let flight = flights as Flight;
  //     if (!!editClone.flightNumber) {
  //       flight.update(editClone);
  //       console.log(editClone);
  //     }
  //   });
  // });

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

export default observer (FlightsDetails);
