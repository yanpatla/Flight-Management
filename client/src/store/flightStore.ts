import { clientAxios } from "@/config";
import { Flight } from "@/models/flights";
import { action, computed, makeObservable, observable } from "mobx";
import { IRootStore } from "./RootStore";
export class FlightStore {
  flights: Flight[] = [];
  rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      flights: observable,
      callGetFlights: action,
      getFlights: computed,
    });
  }

  async callGetFlights() {
    const { data } = await clientAxios.get("/flights");
    this.flights = data.flights ?? [];
    // console.log(data.flights);
  }

  get getFlights() {
    return this.flights;
  }
}
