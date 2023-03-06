//react router dom
import { Form, NavLink } from "react-router-dom";
//assets
import Logo from "../assets/logomark.svg";
//library
import { TrashIcon } from '@heroicons/react/24/solid'

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Ve al inicio">
        <img src={Logo} alt="Logo" height={30} />
        <span>Gastos Personales</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Borrar usuario y todos los datos?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Borrar Usuario</span>
            <TrashIcon width={20}/>
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
