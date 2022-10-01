export interface Flight {
  flightNumber: string;
  status: string;
  takeoffTime: Date;
  landingTime: Date;
  takeoffAirport: string;
  landingAirport: string;
}

export interface IFlights {
  flights: Flight[];
}