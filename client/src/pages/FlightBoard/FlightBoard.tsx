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
    <>
      <FlightBoardStyle>
        <Header>
          <Search
            type="search"
            placeholder="Flight Number, Takeoff or Landing Destination"
            onChange={(e) => setSearchFlight(e.target.value)}
          />
          <Title>FLIGHTS</Title>
        </Header>
        <Table>
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
        </Table>
      </FlightBoardStyle>
    </>
  );
};

const FlightBoardStyle = styled.div`
  background-color: rgb(6, 6, 6);
  border-radius: 10px;
  padding: 10px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;
const Table = styled.table`
  background-color: rgb(46, 46, 46);
  text-align: left;
`;
const Title = styled.h1`
  font-size: 40px;
  padding: 0;
  margin: 0;
  margin-bottom: 10px;
  text-align: center;
  flex: 0.5;
`;

const Search = styled.input`
  width: 40%;
  padding: 10px;
  border-radius: 5px;
  color: #000;
`;
export default observer(FlightBoard);
