import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./../assets/logo-header.png";
import { FaBars } from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

const Navbar = ({ user, toggleSidebar, showSidebar }) => {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar navbar-expand-lg mb-0">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img className="mb-2" src={logo} alt="Missing" height="40" />
            </Link>

            <Link to="#" className={"menu-bars"}>
              <FaBars onClick={toggleSidebar} />
            </Link>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink
                  className="nav-item nav-link"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>

                {/*{user && <Link className="nav-item nav-link" aria-current="page"
                                               to="/dashboard">Dashboard</Link>}*/}

                {/*{user && <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>}*/}

                {!user && (
                  <React.Fragment>
                    <NavLink className="nav-item nav-link" to="/login">
                      Login
                    </NavLink>
                    {/*<NavLink className="nav-item nav-link" to="/register">Register</NavLink>*/}
                  </React.Fragment>
                )}
              </div>
            </div>
            {user && (
              <React.Fragment>
                <div className="nav-item nav-link">
                  <i className="fa fa-user mr-2" />
                  {user.name}
                </div>
                <NavLink className="navbar-brand" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>

        <div className={showSidebar ? "nav-menu active" : "nav-menu"}>
          <ul className={"nav-menu-items"}>
            <li className={"navbar-toggle"} onClick={toggleSidebar}>
              <Link className="menu-bars" to="#">
                <img className="mb-2" src={logo} alt="Missing" height="40" />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? "menu-active" : "nav-item nav-link"}`
                    }
                    to={item.path}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
