import React from 'react';
import swal from 'sweetalert';
import uuid from 'react-uuid'
const axios = require('axios');

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      token: '',
    };
  }

  componentDidMount() {

  }

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
  };

  emailValidation() {
    let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!this.state.email || regex.test(this.state.email) === false) {
      this.setState({
        error: "Email is not valid"
      });
      return false;
    }
    return true;
  }

  register = () => {
    if (this.emailValidation()) {
      let guid_data = uuid(this.state.email);
      localStorage.setItem("guid", guid_data);
      localStorage.setItem("signupinfo", this.state.email);
      axios.post('http://localhost:2000/login', {
        email: this.state.email,
        guid: uuid(this.state.email),
      }).then((res) => {
        swal({
          text: res.data.title,
          icon: "success",
          type: "success"
        });
        if (res.data.title === "Login Successfully.") {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_id', res.data.id);
          this.props.history.push(`/${res.data.data.guid}`);
        } else if ("Registered Successfully.") {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user_id', res.data.id);
          this.props.history.push(`/${res.data.data.guid}/edit`);
        }
      }).catch((err) => {
        swal({
          text: err.response.data.errorMessage,
          icon: "error",
          type: "error"
        });
      });
    } else {
      alert("Email is not valid");
      this.setState({ email: "" });
    }
  }

  render() {
    return (
      <div className="register_style">
        <div>
          <h2 className="register_title mx-auto">Welcome</h2>
          <h2 className="register_title mx-auto">Please enter your email address to continue</h2>
        </div>
        <div style={{ textAlign: "center" }} className="container">
          <input type="email" className="form-control form-rounded register_wrap_input mx-auto" onChange={this.onChange} autoComplete="off" value={this.state.email} name="email" placeholder="Enter your Email" />
          <button type="button" className="btn btn-success form_rnd-btn" disabled={this.state.email === ''} onClick={this.register}>Continue</button>
        </div>
      </div>
    );
  }
}
