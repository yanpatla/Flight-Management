import { clientAxios } from "@/config";
import { Flight, IFlights } from "@/models/flights";
import { action, computed, makeObservable, observable } from "mobx";
import io from "socket.io-client";
import { IRootStore } from "./RootStore";
// let socket;
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
    // socket = io(import.meta.env.VITE_BACKEND_URL);

    // socket.on("flight-update", (flights) => {});
    const { data } = await clientAxios.get("/flights");
    this.flights = data.flights ?? [];
    console.log(data.flights);
  }

  get getFlights() {
    return this.flights;
  }
}
