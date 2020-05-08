import React, { useState, useCallback, useContext } from 'react';
import { withRouter, Redirect } from "react-router";
import app from "../../base";
import { AuthContext } from "../auth";

const Login = ({ history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await app
        .auth()
        .signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <p>
        Faça login usando seu email
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label>
        <input
          id="email"
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <label htmlFor="email">SENHA *</label>
        <input
          id="password"
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )
}
export default withRouter(Login);