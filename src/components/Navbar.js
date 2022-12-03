import logo from "../icons/logo-white-ish.png";
import jwtdecode from "jwt-decode";
import "./NavbarStyles.css";
import { useCallback, useState } from "react";
import loginIcon from "../icons/login.png";
import ReactDOM from "react-dom";
import { SocialIcon } from "react-social-icons";

import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import axios from "axios";

function Navbar(props) {
  const [dropdownLogin, setDropdownLogin] = useState(false);
  const toggleLogin = useCallback(() => {
    setDropdownLogin((opened) => !opened);
  }, [dropdownLogin]);

  const [isUserLogged, setisUserLogged] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );
  const [isRegistered, setIsRegistered] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const clear = () => {
    setName("");
    setPassword("");
    setEmail("");
    setErrorMsg("");
  };

  const handleClick = () => {
    props.setValue("");
  };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        setisUserLogged(true);
        const { token } = res.data;
        const decode = jwtdecode(token);
        console.log(decode);
        localStorage.setItem("user", JSON.stringify(decode));
        clear();
        setDropdownLogin(false);
        console.log("login res", res);
      })
      .catch((err) => {
        console.log(err);
        const { error } = err.response.data;
        console.log(error);
        if (error) {
          return setErrorMsg(error);
        }
      });
    setErrorMsg("");
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setisUserLogged(true);
        const { token } = res.data;
        const decode = jwtdecode(token);
        console.log(decode);
        localStorage.setItem("user", JSON.stringify(decode));
        setName("");
        setPassword("");
        setEmail("");
        setErrorMsg("");
        setDropdownLogin(false);
        console.log("login res", res);
      })
      .catch((err) => {
        console.log(err);
        const { error } = err.response.data;
        console.log(error);
        if (error) {
          return setErrorMsg(error);
        }
      });
    setErrorMsg("");
  };

  const logout = useCallback(() => {
    setisUserLogged(false);
    setDropdownLogin(false);
    localStorage.removeItem("user");
  });

  return (
    <div>
      {/* <div className="annoucement"></div> */}
      <nav>
        <div>
          <Link to="/">
            <img src={logo} className="logo" onClick={handleClick} />
          </Link>
        </div>
        <div>Home · About · Contact</div>
        {/* <SearchBar
          setSetlist={props.setSetlist}
          setTicketmaster={props.setTicketmaster}
          setLat={props.setLat}
          setLong={props.setLong}
          value={props.value}
          setValue={props.setValue}
        /> */}

        <div className="nav-icons">
          <div className="social-media-icons">
            <SocialIcon network="instagram" style={{ height: 35, width: 35 }} />
            <SocialIcon network="twitter" style={{ height: 35, width: 35 }} />
            <SocialIcon network="spotify" style={{ height: 35, width: 35 }} />
          </div>
          <img src={loginIcon} className="loginIcon" onClick={toggleLogin} />
          {dropdownLogin && (
            <div className="dropdown">
              {isUserLogged ? (
                <button className="submit-button" onClick={logout}>
                  Logout
                </button>
              ) : (
                <>
                  {isRegistered === false && (
                    <span id="login-form">
                      <form onSubmit={login}>
                        {errorMsg && (
                          <span style={{ fontWeight: "bold", color: "red" }}>
                            {errorMsg}
                          </span>
                        )}
                        <div className="input-container-login">
                          <input
                            className="input-text-login"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                        <div className="input-container-login">
                          <input
                            className="input-text-login"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <button className="submit-button" type="submit">
                            Login
                          </button>
                        </div>
                      </form>
                    </span>
                  )}
                  {isRegistered === true && (
                    <span id="register-form">
                      <form onSubmit={register}>
                        {errorMsg && (
                          <span style={{ fontWeight: "bold", color: "red" }}>
                            {errorMsg}
                          </span>
                        )}
                        <div className="input-container-login">
                          <input
                            className="input-text-login"
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </div>
                        <div className="input-container-login">
                          <input
                            className="input-text-login"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                        <div className="input-container-login">
                          <input
                            className="input-text-login"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <button className="submit-button" type="submit">
                            Register
                          </button>
                        </div>
                      </form>
                    </span>
                  )}
                  {isRegistered === false && (
                    <>
                      <span className="register-login-text">
                        Not a member?{" "}
                      </span>
                      <span
                        className="toggle-register-login"
                        onClick={() => {
                          setIsRegistered((prev) => !prev);
                          clear();
                        }}
                      >
                        Register
                      </span>
                    </>
                  )}
                  {isRegistered === true && (
                    <>
                      <span className="register-login-text">
                        Have an account?{" "}
                      </span>
                      <span
                        className="toggle-register-login"
                        onClick={() => {
                          setIsRegistered((prev) => !prev);
                          clear();
                        }}
                      >
                        Login
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </nav>
      <hr className="separator"></hr>
    </div>
  );
}

export default Navbar;
