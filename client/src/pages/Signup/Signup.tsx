import React from "react";
export interface SignupInterface {}

const Signup: React.FC<SignupInterface> = () => {
  return (
    <div>
      <div className="form-usuario">
        <div className="contenedor-form sombra-dark">
          <h1>Make an Account</h1>
          <form>
            <div className="campo-form">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                // value={nombre}
                placeholder="Your Name"
                // onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                // value={email}
                placeholder="Your Email"
                // onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                // value={password}
                placeholder="Your Password"
                // onChange={onChange}
              />
            </div>
            <div className="campo-form">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                // value={confirmar}
                placeholder="Repite your Password"
                // onChange={onChange}
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

export default Signup;
