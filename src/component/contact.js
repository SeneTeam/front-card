import React, { Component } from 'react';
const axios = require('axios');

export default class CONTACT extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            office_email: '',
            name: '',
            title: '',
            mobile: '',
            phone: '',
            address: '',
            facebook: '',
            whatsapp: '',
            linkedin: '',
            twitter: '',
            uuid_data: '',
            guid: '',
            token: '',
            file: '',
            image: '',
            id: '',
        };
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) {
            this.props.history.push('/');
        } else {
            this.setState({ token: token }, () => {
                this.getData();
            });
        }
    }

    getData() {
        let guid_data = window.location.pathname.split("/")[1];
        axios.get(`http://localhost:2000/getdata`, {
            headers: {
                'token': this.state.token
            }
        }).then((res) => {
            let cnt = 0;
            res.data.forEach(user => {
                if (user.guid === guid_data) {
                    this.setState({ id: user._id });
                    this.setState({ email: user.email });
                    this.setState({ image: user.image });
                    this.setState({ name: user.name });
                    this.setState({ office_email: user.office_email });
                    this.setState({ title: user.title });
                    this.setState({ mobile: user.mobile });
                    this.setState({ phone: user.phone });
                    this.setState({ address: user.address });
                    this.setState({ facebook: user.facebook });
                    this.setState({ whatsapp: user.whatsapp });
                    this.setState({ linkedin: user.linkedin });
                    this.setState({ twitter: user.twitter });
                    this.setState({ guid: user.guid });
                    cnt++;
                }
            })
            if (cnt === 0) {
                this.props.history.push('/');
            }
        }).catch((err) => {

        });
    }

    render() {
        return (
            <div>
                <div style={{ height: "45vh", borderRadius: "20px 20px 0 0" }}>
                    {
                        this.state.image ? <img src={`http://localhost:2000/${this.state.image}`} alt="John" className="user_avatar" />
                            : <img src="../alt.jpg" alt="John" className="user_avatar" />
                    }
                    <h2 >{this.state.name}</h2>
                    {
                        this.state.facebook ? <a href={this.state.facebook}><i className="fa fa-facebook" style={{ margin: "0 1rem" }}></i></a>
                            : <a href="https://facebook.com"><i className="fa fa-facebook" style={{ margin: "0 1rem" }}></i></a>
                    }
                    {
                        this.state.twitter ? <a href={this.state.facebook}><i className="fa fa-twitter" style={{ margin: "0 1rem" }}></i></a>
                            : <a href="https://twitter.com"><i className="fa fa-twitter" style={{ margin: "0 1rem" }}></i></a>
                    }
                    {
                        this.state.linkedin ? <a href={this.state.linkedin}><i className="fa fa-linkedin" style={{ margin: "0 1rem" }}></i></a>
                            : <a href="https://linkedin.com"><i className="fa fa-linkedin" style={{ margin: "0 1rem" }}></i></a>
                    }
                    {
                        this.state.whatsapp ? <a href={this.state.whatsapp}><i className="fa fa-whatsapp" style={{ margin: "0 1rem" }}></i></a>
                            : <a href="https://whatsapp.com"><i className="fa fa-whatsapp" style={{ margin: "0 1rem" }}></i></a>
                    }
                </div>
                <div >
                    <hr />
                    <div className="form-group" style={{ textAlign: "left" }}>
                        <label htmlFor="email">Mobile:</label>
                        {
                            this.state.mobile ? <a href="tel:+ 385 95 7507 783" className="form-control input_border" style={{ color: "#0056b3" }}>{this.state.mobile}</a>
                                : <p></p>
                        }
                    </div>
                    <div className="form-group" style={{ textAlign: "left" }}>
                        <label htmlFor="email">Phone(Office):</label>
                        {
                            this.state.phone ? <a href="tel:+ 1(408) 974-0100" className="form-control input_border" style={{ color: "#0056b3" }}>{this.state.phone}</a>
                                : <p></p>
                        }
                    </div>
                    <div className="form-group" style={{ textAlign: "left" }}>
                        <label htmlFor="email">Address:</label>
                        {
                            this.state.address ? <p className="form-control input_border thing" style={{ color: "#0056b3" }}>{this.state.address}</p>
                                : <p></p>
                        }
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
}