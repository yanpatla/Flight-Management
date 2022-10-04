import { observer } from "mobx-react";
import { AuthContext } from "@/context";
import styled from "@emotion/styled";
import React, { useContext } from "react";
export interface LoginInterface {}

const Login: React.FC<LoginInterface> = () => {
  const { authStore } = useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authStore?.login();

    authStore?.setEmail("");
    authStore?.setPassword("");
  };
  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Make an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={authStore?.values.email || ""}
              onChange={(e) => authStore?.setEmail(e.target.value)}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={authStore?.values.password || ""}
              onChange={(e) => authStore?.setPassword(e.target.value)}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              value="Registrar"
              className="btn btn-primario btn-block"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
const Input = styled.input`
  color: #000;
  text-transform: none;
`;
export default observer(Login);
