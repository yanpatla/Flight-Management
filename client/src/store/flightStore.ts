import { makeObservable } from "mobx";
import { IRootStore } from "./RootStore";

export class FlightStore {
  rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    makeObservable(this);
    this.rootStore = rootStore;
  }

  async getFlights() {}
}
