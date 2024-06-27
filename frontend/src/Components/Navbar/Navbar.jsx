import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

import logo from "../Assets/logo.png";
import cart from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";

function Navbar() {
  const { getTotalCartItems } = useContext(ShopContext);
  const location = useLocation();
  const [menu, setMenu] = useState("shop");

  useEffect(() => {
    switch (location.pathname) {
      case "/mens":
        setMenu("men");
        break;
      case "/womens":
        setMenu("women");
        break;
      case "/kids":
        setMenu("kids");
        break;
      default:
        setMenu("shop");
        break;
    }
  }, [location.pathname]);
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          {" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            Shop{" "}
          </Link>{" "}
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("men")}>
          {" "}
          <Link to="/mens" style={{ textDecoration: "none" }}>
            {" "}
            Men{" "}
          </Link>{" "}
          {menu === "men" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("women")}>
          {" "}
          <Link to="/womens" style={{ textDecoration: "none" }}>
            {" "}
            Women{" "}
          </Link>{" "}
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("kids")}>
          {" "}
          <Link to="/kids" style={{ textDecoration: "none" }}>
            {" "}
            Kids{" "}
          </Link>{" "}
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            {" "}
            <button>Login</button>{" "}
          </Link>
        )}

        <Link to="/cart" style={{ textDecoration: "none" }}>
          {" "}
          <img src={cart} alt="" />{" "}
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
}

export default Navbar;
