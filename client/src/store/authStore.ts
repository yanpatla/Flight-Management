import { clientAxios } from "@/config";
import { makeObservable, observable } from "mobx";

export class AuthStore {
  @observable errors!: string;
  @observable token!: string;
  @observable values = {
    username: "",
    email: "",
    password: "",
  };

  constructor() {
    makeObservable(this);
  }

  setUsername(username: string) {
    this.values.username = username;
  }

  setEmail(email: string) {
    this.values.email = email;
  }

  setPassword(password: string) {
    this.values.password = password;
  }

  async signup() {
    try {
      const { data } = await clientAxios.post("/users", this.values);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}
