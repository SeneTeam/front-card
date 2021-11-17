import React, { Component } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent } from '@material-ui/core';
import swal from 'sweetalert';
const axios = require('axios');

export default class EDIT extends Component {
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
            openProductModal: false,
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
            edit_workinghours: false,
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

    editUser = () => {
        const fileInput = document.querySelector("#fileInput");
        const file = new FormData();
        file.append('id', this.state.id);
        file.append('file', fileInput.files[0]);
        file.append('email', this.state.email);
        file.append('office_email', this.state.office_email);
        file.append('name', this.state.name);
        file.append('title', this.state.title);
        file.append('mobile', this.state.mobile);
        file.append('phone', this.state.phone);
        file.append('address', this.state.address);
        file.append('facebook', this.state.facebook);
        file.append('whatsapp', this.state.whatsapp);
        file.append('linkedin', this.state.linkedin);
        file.append('twitter', this.state.twitter);
        axios.post('http://localhost:2000/edit', file, {
            headers: {
                'content-type': 'multipart/form-data',
                'token': this.state.token
            }
        }).then((res) => {
            swal({
                text: res.data.title,
                icon: "success",
                type: "success"
            });
            this.setState({ email: '', office_email: '', name: '', title: '', phone: '', address: '', facebook: '', whatsapp: '', linkedin: '', twitter: '', file: null, mobile: '' }, () => {
                this.props.history.push(`/${this.state.guid}`);
            });
        }).catch((err) => {

        });
    }

    onChange = (e) => {
        if (e.target.files && e.target.files[0] && e.target.files[0].name) {
            this.setState({ fileName: e.target.files[0].name }, () => { });
        }
        this.setState({ [e.target.name]: e.target.value }, () => { });
    };

    handleProductOpen = () => {
        this.setState({
            openProductModal: true,
        });
    };

    handleProductClose = () => {
        this.setState({ openProductModal: false });
    };

    updateData = (e) => {
        let strdata = e.target.name;
        let myArray = strdata.split("`");
        let arrs = this.state.week_hour;
        let arr = [];
        if (myArray[0] === "Sun") {
            arr = arrs[0];
            if (myArray[1] === "label") {
                arr.week_data[myArray[2]].label = e.target.value;
            }
            if (myArray[1] === "from") {
                arr.week_data[myArray[2]].from = e.target.value;
            }
            if (myArray[1] === "to") {
                arr.week_data[myArray[2]].to = e.target.value;
            }
            arrs[0] = arr;
        } else if (myArray[0] === "Mon") {
            arr = arrs[1];
            if (myArray[1] === "label") {
                arr.week_data[myArray[2]].label = e.target.value;
            }
            if (myArray[1] === "from") {
                arr.week_data[myArray[2]].from = e.target.value;
            }
            if (myArray[1] === "to") {
                arr.week_data[myArray[2]].to = e.target.value;
            }
            arrs[1] = arr;
        } else if (myArray[0] === "Tue") {
            arr = arrs[2];
            if (myArray[1] === "label") {
                arr.week_data[myArray[2]].label = e.target.value;
            }
            if (myArray[1] === "from") {
                arr.week_data[myArray[2]].from = e.target.value;
            }
            if (myArray[1] === "to") {
                arr.week_data[myArray[2]].to = e.target.value;
            }
            arrs[2] = arr;
        } else if (myArray[0] === "Wed") {
            arr = arrs[3];
            if (myArray[1] === "label") {
                arr.week_data[myArray[2]].label = e.target.value;
            }
            if (myArray[1] === "from") {
                arr.week_data[myArray[2]].from = e.target.value;
            }
            if (myArray[1] === "to") {
                arr.week_data[myArray[2]].to = e.target.value;
            }
            arrs[3] = arr;
        } else if (myArray[0] === "Thu") {
            arr = arrs[4];
            if (myArray[1] === "label") {
                arr.week_data[myArray[2]].label = e.target.value;
            }
            if (myArray[1] === "from") {
                arr.week_data[myArray[2]].from = e.target.value;
            }
            if (myArray[1] === "to") {
                arr.week_data[myArray[2]].to = e.target.value;
            }
            arrs[4] = arr;
        } else if (myArray[0] === "Fri") {
            arr = arrs[5];
            if (myArray[1] === "label") {
                arr.week_data[myArray[2]].label = e.target.value;
            }
            if (myArray[1] === "from") {
                arr.week_data[myArray[2]].from = e.target.value;
            }
            if (myArray[1] === "to") {
                arr.week_data[myArray[2]].to = e.target.value;
            }
            arrs[5] = arr;
        } else if (myArray[0] === "Sat") {
            arr = arrs[6];
            if (myArray[1] === "label") {
                arr.week_data[myArray[2]].label = e.target.value;
            }
            if (myArray[1] === "from") {
                arr.week_data[myArray[2]].from = e.target.value;
            }
            if (myArray[1] === "to") {
                arr.week_data[myArray[2]].to = e.target.value;
            }
            arrs[6] = arr;
        }
        this.setState({ week_hour: arrs });
    }

    addData(weekname) {
        let arrs = this.state.week_hour;
        let arr = [];
        if (weekname === "Sun") {
            arr = arrs[0];
            let data = { label: "", from: "", to: '' };
            let weeksdata = [...arr.week_data, data];
            arr.week_data = weeksdata;
            arrs[0] = arr;
        } else if (weekname === "Mon") {
            arr = arrs[1];
            let data = { label: "", from: "", to: '' };
            let weeksdata = [...arr.week_data, data];
            arr.week_data = weeksdata;
            arrs[1] = arr;
        } else if (weekname === "Tue") {
            arr = arrs[2];
            let data = { label: "", from: "", to: '' };
            let weeksdata = [...arr.week_data, data];
            arr.week_data = weeksdata;
            arrs[2] = arr;
        }
        else if (weekname === "Wed") {
            arr = arrs[3];
            let data = { label: "", from: "", to: '' };
            let weeksdata = [...arr.week_data, data];
            arr.week_data = weeksdata;
            arrs[3] = arr;
        }
        else if (weekname === "Thu") {
            arr = arrs[4];
            let data = { label: "", from: "", to: '' };
            let weeksdata = [...arr.week_data, data];
            arr.week_data = weeksdata;
            arrs[4] = arr;
        }
        else if (weekname === "Fri") {
            arr = arrs[5];
            let data = { label: "", from: "", to: '' };
            let weeksdata = [...arr.week_data, data];
            arr.week_data = weeksdata;
            arrs[5] = arr;
        }
        else if (weekname === "Sat") {
            arr = arrs[6];
            let data = { label: "", from: "", to: '' };
            let weeksdata = [...arr.week_data, data];
            arr.week_data = weeksdata;
            arrs[6] = arr;
        }
        this.setState({ week_hour: arrs });
    }

    saveWorkinghour = () => {
        const headers = {
            'token': this.state.token
        };
        const data = {
            user_id: this.state.id,
            header_label: this.state.header_label,
            week_hour: this.state.week_hour,
        }
        axios.post('http://localhost:2000/addworkinghours', data, { headers })
            .then((res) => {
                this.getworkinghours();
            }).catch((err) => {
                swal({
                    text: err.response.data.errorMessage,
                    icon: "error",
                    type: "error"
                });
            });
        this.handleProductClose();
    }

    editWorkinghour = () => {
        const headers = {
            'token': this.state.token
        };
        const data = {
            id: this.state.getworkinghoursData[0]._id,
            user_id: this.state.id,
            header_label: this.state.header_label,
            week_hour: this.state.week_hour,
        }
        axios.post('http://localhost:2000/editworkinghours', data, { headers })
            .then((res) => {
                this.getworkinghours();
            }).catch((err) => {
                swal({
                    text: err.response.data.errorMessage,
                    icon: "error",
                    type: "error"
                });
            });
        this.handleProductClose();
    }

    render() {
        return (
            <div>
                <div style={{ height: "25vh", borderRadius: "20px 20px 0 0" }}>
                    {
                        this.state.image ? <img src={`http://localhost:2000/${this.state.image}`} alt="John" className="user_avatar" />
                            : <img src="../alt.jpg" alt="John" className="user_avatar" />
                    }
                    <p><Button
                        variant="contained"
                        component="label"
                        style={{ padding: "0px", boxShadow: "none", background: "transparent" }}
                    > <i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp;Edit
                        <input
                            type="file"
                            accept="image/*"
                            name="file"
                            value={this.state.file || ""}
                            onChange={this.onChange}
                            id="fileInput"
                            placeholder="File"
                            hidden
                        />
                    </Button></p>
                </div>
                <div style={{ marginTop: "10px" }}>
                    <div >
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: "left", fontSize: "20px" }} onClick={this.handleProductOpen}>
                                <tr>
                                    <td style={{ width: "30px", paddingRight: "0" }}><i className="fa fa-plus-circle" aria-hidden="true" style={{ color: "#0066ff", fontSize: "30px" }}></i></td>
                                    <td>Add Workhour</td>
                                </tr>
                            </tbody>
                        </table><hr />
                        <form >
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Email:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" disabled value={this.state.email} name="email" />
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Office Email:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.office_email} onChange={this.onChange} placeholder="test1@test1.gmail.com" name="office_email" />
                            </div>
                            <hr />
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Full Name:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.name} onChange={this.onChange} placeholder="John Doe" name="name" />
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Title:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.title} onChange={this.onChange} placeholder="CEO & Founder" name="title" />
                            </div>
                            <hr />
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Mobile:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.mobile} onChange={this.onChange} placeholder="+ 385 95 7507 783" name="mobile" />
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Phone(Office):</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.phone} onChange={this.onChange} placeholder="+ 1(408) 974-0100" name="phone" />
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Address:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.address} onChange={this.onChange} placeholder="817 Greenbrier Road C DeKalb, IL 60115 US" name="address" />
                            </div>
                            <hr />
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Facebook:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.facebook} onChange={this.onChange} placeholder="https://facebook.com/name" name="facebook" />
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">WhatsApp:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.whatsapp} onChange={this.onChange} placeholder="https://whatsapp.com/name" name="whatsapp" />
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Linkedin:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.linkedin} onChange={this.onChange} placeholder="https://linkedin.com/name" name="linkedin" />
                            </div>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email">Twitter:</label>
                                <input type="email" className="form-control input_border" autoComplete="off" value={this.state.twitter} onChange={this.onChange} placeholder="https://twitter.com/name" name="twitter" />
                            </div>
                            <hr />

                            <button type="button" className="btn btn-primary" onClick={(e) => this.editUser()}>Save</button>
                        </form>
                    </div>
                </div>

                <Dialog
                    open={this.state.openProductModal}
                    onClose={this.handleProductClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Add Workhour</DialogTitle>
                    <DialogContent>
                        <form style={{ textAlign: "left" }}>
                            <div className="form-group" style={{ textAlign: "left" }}>
                                <label htmlFor="email" style={{ color: "blue" }}>Add your Header Label</label>
                                <input type="text" className="form-control" autoComplete="off" value={this.state.header_label} onChange={this.onChange} placeholder="Open hours" name="header_label" />
                            </div>
                            <hr />
                            {
                                this.state.week_hour.map((week, k) => {
                                    return <div key={k}>
                                        <label style={{ color: "blue" }}>{week.name}</label>
                                        {
                                            week.week_data.map((data, i) => {
                                                return <table className="table table-borderless" key={i}>
                                                    <thead>
                                                        <tr>

                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ textAlign: "left" }}>
                                                        <tr>
                                                            <td >label</td>
                                                            <td>
                                                                <div style={{ display: "flex" }}>
                                                                    <input type="text" className="form-control" autoComplete="off" ref={"label" + i} value={data.label} onChange={this.updateData} placeholder="label" name={week.name + "`label`" + i} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>from, to</td>
                                                            <td>
                                                                <div style={{ display: "flex" }}>
                                                                    <input type="text" className="form-control" autoComplete="off" ref={"from" + i} value={data.from} onChange={this.updateData} placeholder="from" name={week.name + "`from`" + i} />
                                                                    <input type="text" className="form-control" autoComplete="off" ref={"to" + i} value={data.to} onChange={this.updateData} placeholder="to" name={week.name + "`to`" + i} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            })
                                        }
                                        <i className="fa fa-plus-circle" aria-hidden="true" style={{ fontSize: "22px", color: "teal" }} onClick={() => this.addData(week.name)} ></i>
                                    </div>
                                })
                            }
                            <hr />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        {
                            this.state.edit_workinghours ? <Button onClick={this.editWorkinghour} color="primary">Edit</Button>
                                : <Button onClick={this.saveWorkinghour} color="primary">Save</Button>
                        }
                        <Button onClick={this.handleProductClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}