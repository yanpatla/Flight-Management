import { observer } from "mobx-react";
import { AuthContext } from "@/context";
import React, { useContext } from "react";
import styled from "@emotion/styled";
export interface SignupInterface {}

const Signup: React.FC<SignupInterface> = () => {
  const { authStore } = useContext(AuthContext);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authStore?.signup();
  };
  return (
    <div>
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Make an Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="campo-form">
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={authStore?.values.username || ""}
                onChange={(e) => authStore?.setUsername(e.target.value)}
              />
            </div>
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
          {/* <Link to={"/"} className="enlace-cuenta">
            Iniciar Sesion
          </Link> */}
        </div>
      </div>
    </div>
  );
};
const Input = styled.input`
  color: #000;
  text-transform: none;
`;

export default observer(Signup);
