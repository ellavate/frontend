import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: props.type,
      toggle: props.toggleModal,
      loading: false
    };

    this.stopProp = this.stopProp.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  stopProp(e) {
    e.stopPropagation();
    // this.state.toggle(false);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();
    const creds = { email: this.state.email, password: this.state.password };
    this.setState({ email: "", password: "", loading: true });

    if (this.state.type === "signup") {
      console.log("go for signup");
      axios
        .post("http://localhost:8000/api/register", creds)
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.state.toggle(false);
          this.props.history.push("/home");
        })
        .catch(error => {
          console.error(error);
        });
    } else if (this.state.type === "login") {
      axios
        .post("http://localhost:8000/api/login", creds)
        .then(response => {
          localStorage.setItem("token", response.data.token);
          this.state.toggle(false);
          this.props.history.push("/home");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    let title = this.state.type === "login" ? "Login" : "Sign Up";
    return (
      <div className="overlay" onClick={this.stopProp}>
        <div className="login-form">
          <h1>{title}</h1>
          <form onSubmit={this.submitHandler}>
            <label>
              Email:
              <input
                name="email"
                placeholder="Enter email"
                type="email"
                onChange={this.changeHandler}
                value={this.state.email}
              />
            </label>
            <label>
              Password:
              <input
                name="password"
                placeholder="Enter password"
                type="password"
                onChange={this.changeHandler}
                value={this.state.password}
              />
            </label>
            <button
              onClick={() => {
                this.state.toggle(false);
              }}
            >
              Cancel
            </button>
            <button type="submit" onClick={this.submitHandler}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
