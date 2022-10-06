import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { clientAxios } from "@/config";
import Flight from "@/models/flights";
import io, { Socket } from "socket.io-client";
export interface IFlightsStore {
  flights: IObservableArray<Flight>;
  search: string;
  getFlights: Flight[];
  init: () => void;
  setSearch: (searchVal: string) => void;
}
const socket: Socket = io(import.meta.env.VITE_BACKEND_URL);
export class FlightStore implements IFlightsStore {
  @observable flights: IObservableArray<Flight> = observable.array<Flight>([]);
  @observable search: string = "";
  constructor() {
    makeObservable(this);
  }

  @action async init() {
    const { data } = await clientAxios.get("/flights");
    this.flights = data.flights ?? [];
    socket.on("flight-update", (flights) => {
      runInAction(() => {
        let flight = flights as Flight;

        const check = this.flights.find(
          (el) => flight.flightNumber === el.flightNumber
        );
        if (check) {
          console.log(check);
          console.log(flight);
          check.update(new Flight(flight));
        }
      });
    });
  }
  @action setSearch(searchFlight: string) {
    this.search = searchFlight;
  }
  @computed get getFlights(): Flight[] {
    if (this.search === "") return this.flights;

    return this.flights.filter(
      (flight: {
        flightNumber: string;
        landingAirport: string;
        takeoffAirport: string;
      }) =>
        flight.flightNumber.toLowerCase().includes(this.search.toLowerCase()) ||
        flight.landingAirport
          .toLowerCase()
          .includes(this.search.toLowerCase()) ||
        flight.takeoffAirport.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
