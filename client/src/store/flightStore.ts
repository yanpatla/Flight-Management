import { IFlights } from "@/models/flights";
import { makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";

export class FlightStore {
  flights: IFlights[] = [];
  rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    makeObservable(this, {
      flights: observable,
    });
    this.rootStore = rootStore;
  }

  async getFlights() {}
}
