import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = () => {
  }

  render() {
    return (
      <div style={{ marginTop: '20%', textAlign: "center" }}>
        <div>
          <h2 className="register_title mx-auto">Welcome back</h2>
          <h2 className="register_title mx-auto">Please click the link in the email we sent you to edit your details</h2>
        </div>
        <div style={{ textAlign: "center" }} className="container">
          <button type="button" className="btn btn-success form_rnd-btn" style={{ marginTop: "75%" }}>Close</button>
        </div>
      </div>
    );
  }
}
