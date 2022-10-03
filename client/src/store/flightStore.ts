import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { clientAxios } from "@/config";
import { Flight, IFlights } from "@/models/flights";
export interface IFlightsStore {
  flights: IObservableArray<Flight>;
  callGetFlights: () => void;
  getFlights: Flight[];
}
export class FlightStore implements IFlightsStore {
  @observable flights: IObservableArray<Flight> = observable.array<Flight>([]);
  constructor() {
    makeObservable(this);
  }

  @action async callGetFlights() {
    const { data } = await clientAxios.get("/flights");
    runInAction(() => {
      this.flights = data.flights ?? [];
    });
  }

  @computed get getFlights() {
    return this.flights;
  }
}
