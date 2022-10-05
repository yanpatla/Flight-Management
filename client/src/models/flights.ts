import { action, makeObservable, observable } from "mobx";

export interface IFlight {
  flightNumber: string;
  status: string;
  takeoffTime: Date;
  landingTime: Date;
  takeoffAirport: string;
  landingAirport: string;
}

// export interface IFlights {
//   Flights: IFlight[];
// }

export default class Flight implements IFlight {
  @observable flightNumber!: string;
  @observable takeoffTime!: Date;
  @observable landingTime!: Date;
  @observable takeoffAirport!: string;
  @observable landingAirport!: string;
  @observable status!: string;
  constructor(params?: IFlight) {
    if (params) {
      this.flightNumber = params.flightNumber;
      this.landingAirport = params.landingAirport;
      this.landingTime = params.landingTime;
      this.status = params.status;
      this.takeoffAirport = params.takeoffAirport;
      this.takeoffTime = params.takeoffTime;
    }
    makeObservable(this);
  }
  @action update(flight: IFlight) {
    console.log(flight);
    this.flightNumber = flight.flightNumber;
    this.landingAirport = flight.landingAirport;
    this.landingTime = flight.landingTime;
    this.status = flight.status;
    this.takeoffAirport = flight.takeoffAirport;
    this.takeoffTime = flight.takeoffTime;
  }
}
