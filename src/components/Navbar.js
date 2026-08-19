import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(()=>{showButton();},[])

  useEffect(()=>{
    window.addEventListener("resize", showButton);
    return () => {
      window.removeEventListener("resize", showButton);
    };
  },[])

  const handleLogout = async () => {
    try {
      await signOut(auth);
      closeMobileMenu();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            TRVL
            <i className="fab fa-typo3" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>

            {user && (
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>
            )}
            {!button && (
              <li className="nav-item">
                {user ? (
                  <button className="nav-links-mobile" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/sign-up"
                    className="nav-links-mobile"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                )}
              </li>
            )}
          </ul>

          {button &&
            (user ? (
              <Button buttonStyle="btn--outline" onClick={handleLogout}>
                LOGOUT
              </Button>
            ) : (
              <Link to="/sign-up">
                <Button buttonStyle="btn--outline">SIGN UP</Button>
              </Link>
            ))}
        </div>
      </nav>
    </>
  );
}
export default Navbar;
