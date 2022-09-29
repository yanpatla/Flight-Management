export interface Flight {
  flightNumber: string;
  status: string;
  takeoffTime: string;
  landingTime: string;
  takeoffAirport: string;
  landingAirport: string;
}

export interface IFlights {
  flights: Flight[];
}
