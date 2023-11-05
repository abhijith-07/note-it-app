import logo from "../assets/images/logo.svg";

export const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
      <h3 className="logo-name">Note it</h3>
    </nav>
  );
};
