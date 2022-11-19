import logo from "../icons/logo.png";
import "./NavbarStyles.css";
import { useCallback, useState } from "react";
import loginIcon from "../icons/login.png";
import searchIcon from "../icons/search.png";

function Navbar() {
  const [dropdownLogin, setDropdownLogin] = useState(false);
  const toggleLogin = useCallback(() => {
    setDropdownLogin(opened => !opened);
  }, [dropdownLogin]);

  const [isUserLogged, setisUserLogged] = useState(false);

  const login = useCallback(() => {
    setisUserLogged(true);
    setDropdownLogin(false);
  });

  const logout = useCallback(() => {
    setisUserLogged(false);
    setDropdownLogin(false);
  });

  return (
    <div>
      <div className="annoucement"></div>
      <nav>
        <div>
          <a>
            <img src={logo} className="logo"></img>
          </a>
        </div>
        <div className="search">
          <div className="input-container-search">
            <img className="searchIcon" src={searchIcon}></img>
            <input
              className="input-text-search"
              type="search"
              placeholder="Search your favorite artist"
            ></input>
          </div>
        </div>
        <div>
          <img src={loginIcon} className="loginIcon" onClick={toggleLogin} />
          {dropdownLogin && (
            <div className="dropdown">
              {isUserLogged ? (
                <button className="submit-button" onClick={logout}>
                  Logout
                </button>
              ) : (
                <form>
                  <div className="input-container">
                    <input
                      className="input-text"
                      type="text"
                      placeholder="Username"
                    />
                  </div>
                  <div className="input-container">
                    <input
                      className="input-text"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <button className="submit-button" onClick={login}>
                      Login
                    </button>
                  </div>
                </form>
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
