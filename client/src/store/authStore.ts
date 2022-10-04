import { clientAxios } from "@/config";
import { IUser } from "@/models/user";
import { action, makeObservable, observable } from "mobx";
export interface IAuthStore {
  errors: string;
  token: string | null;
  values: IUser;
  setUsername: (val: string) => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  signup: () => void;
  login: () => void;
  setAuth: () => void;
}
export class AuthStore implements IAuthStore {
  @observable errors!: string;
  @observable token = localStorage.getItem("token");
  @observable values: IUser = {
    username: "",
    email: "",
    password: "",
  };

  constructor() {
    makeObservable(this);
  }

  @action setUsername(username: string) {
    this.values.username = username;
    console.log(username);
  }

  @action setEmail(email: string) {
    this.values.email = email;
  }

  @action setPassword(password: string) {
    this.values.password = password;
  }

  @action async signup() {
    try {
      const { data } = await clientAxios.post("/users", this.values);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  @action async setAuth() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  }

  @action async login() {
    try {
      const { data } = await clientAxios.post("/users/login", this.values);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error);
    }
  }
}
