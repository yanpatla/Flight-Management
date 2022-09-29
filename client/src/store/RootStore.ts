import { FlightStore } from "./flightStore";

export interface IRootStore {
  flightStore: FlightStore;
}
export class RootStore implements IRootStore {
  flightStore: FlightStore;
  constructor() {
    this.flightStore = new FlightStore(this);
  }
}
