import React from "react";
import { Form } from "react-router-dom";

//library
import { UserPlusIcon } from "@heroicons/react/24/solid";

//assets
import ilustration from '../assets/illustration.jpg';

const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Toma el control de <span className="accent">Tu Dinero</span>
        </h1>
        <p>Controlar tus gastos, es el secreto de tu libertad financiera.</p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="Cual es tu nombre?"
            aria-label="Tu nombre"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark">
            <span>Crear cuenta</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={ilustration} alt="people with money" width={600}/>
    </div>
  );
};

export default Intro;
