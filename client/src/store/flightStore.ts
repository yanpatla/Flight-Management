import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { clientAxios } from "@/config";
import { Flight } from "@/models/flights";
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
    runInAction(() => {
      this.flights = data.flights ?? [];
    });
  }

  get getFlights() {
    return this.flights;
  }
}
