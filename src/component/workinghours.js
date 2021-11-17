import React, { Component } from 'react';
const axios = require('axios');

export default class WORKINGHOURS extends Component {
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
            header_label: '',
            week_hour: [
                { "name": "Sun", "week_data": [{ "label": "", "from": "", "to": "" }] },
                { "name": "Mon", "week_data": [{ "label": "", "from": "", "to": "" }] },
                { "name": "Tue", "week_data": [{ "label": "", "from": "", "to": "" }] },
                { "name": "Wed", "week_data": [{ "label": "", "from": "", "to": "" }] },
                { "name": "Thu", "week_data": [{ "label": "", "from": "", "to": "" }] },
                { "name": "Fri", "week_data": [{ "label": "", "from": "", "to": "" }] },
                { "name": "Sat", "week_data": [{ "label": "", "from": "", "to": "" }] },
            ],
            getworkinghoursData: [],
        };
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) {
            this.props.history.push('/');
        } else {
            this.setState({ token: token }, () => {
                this.getData();
                this.getworkinghours();
            });
        }
    }

    getworkinghours() {
        axios.get(`http://localhost:2000/getworkinghours`, {
            headers: {
                'token': this.state.token
            }
        }).then((res) => {
            if (res.data.length === 1) {
                this.setState({ edit_workinghours: true });
                this.setState({ getworkinghoursData: res.data });
                this.setState({ week_hour: res.data[0].week_hour });
                this.setState({ header_label: res.data[0].header_label });
            }
        }).catch((err) => {

        });
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
                    <h2 style={{ color: "black" }}>{this.state.name}</h2>
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
                <div>
                    <form style={{ textAlign: "left" }}>
                        <div className="form-group" style={{ textAlign: "left" }}>
                            <label htmlFor="email" style={{ color: "blue" }}>{this.state.header_label}</label>
                        </div>
                        <hr />
                        {
                            this.state.week_hour.map((week, k) => {
                                return <div key={k}>
                                    {
                                        week.week_data.map((data, i) => {
                                            return <table className="table table-borderless" key={i}>
                                                <thead>
                                                    <tr>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ width: "30%" }}><td style={{ color: "blue", width: "40%" }}>{week.name}</td>
                                                        <td>{data.label}</td>
                                                    </tr>
                                                    {
                                                        data.from ? <tr>
                                                            <td></td>
                                                            <td>{data.from}&nbsp;to&nbsp;{data.to}</td>
                                                        </tr>
                                                            : <tr></tr>
                                                    }
                                                </tbody>
                                            </table>
                                        })
                                    }
                                </div>
                            })
                        }
                        <hr />
                    </form>
                </div>
                <div >

                </div>
            </div>
        );
    }
}