import React, { Component } from 'react';
import { Link } from "react-router-dom";
const axios = require('axios');

export default class Mainpage extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            image: '',
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
                    <Link to={this.props.match.params.GUIDid + "/edit"}><i className="fa fa-pencil-square-o" aria-hidden="true" style={{ position: "fixed", top: "30px", right: "30px" }}></i></Link>
                    {
                        this.state.image ? <img src={`http://localhost:2000/${this.state.image}`} alt="John" className="user_avatar" />
                            : <img src="../alt.jpg" alt="John" className="user_avatar" />
                    }
                    <h2 >{this.state.name}</h2>
                    <p className="title">{this.state.title}</p>
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
                <div className="main_buttons">
                    <div>
                        <Link to={this.props.match.params.GUIDid + "/vcard"}><button type="button" className="btn btn-success form_rnd-btn">Vcard</button></Link>
                        <Link to={this.props.match.params.GUIDid + "/workinghours"}><button type="button" className="btn btn-success form_rnd-btn">Working hours</button></Link>
                        <Link to={this.props.match.params.GUIDid + "/contact"}><button type="button" className="btn btn-success form_rnd-btn">Contact</button></Link>
                    </div>

                </div>
                <div >

                </div>
            </div>
        );
    }
}