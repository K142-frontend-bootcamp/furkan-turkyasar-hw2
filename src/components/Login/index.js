import React from "react";
import "./style.css";
import { toast } from "react-toastify";
import logo from "../../../src/logo.png";
import App from "../../App";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isAuth: false,
    };
  }
  // checking the value that came from input
  userNameControl = (e) => {
    const trimmedUsername = e.target.value.trim();

    this.setState({
      username: trimmedUsername,
    });
  };
  // checking the password
  passwordControl = (e) => {
    const trimmedPassword = e.target.value.trim();

    this.setState({
      password: trimmedPassword,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // if input values are correct then show success message otherwise error message
    if (this.state.username === "admin" && this.state.password === "admin") {
      this.setState({
        isAuth: true,
      });
      toast.success("Başarılı bir şekilde giriş yaptınız!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.warn("Hatalı kullanıcı adı ya da şifre girdiniz!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //if user Auth goes to app
  render() {
    return (
      <>
        {this.state.isAuth ? (
          <App />
        ) : (
          <div className="container">
            <img id="image-0" src={logo} alt="logo" />
            <form onSubmit={this.handleSubmit}>
              <h1>Login</h1>
              <div className="wrapper">
                <div className="input-container">
                  <label id="uNameLabel">
                    {" "}
                    <b>Username</b>
                  </label>
                  <input
                    onChange={this.userNameControl}
                    type="text"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>

                <div className="input-container">
                  <label id="passLabel">
                    <b>Password</b>
                  </label>
                  <input
                    onChange={this.passwordControl}
                    type="password"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              <button id="submit-button" type="submit">
                <b>Login</b>
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default Login;
