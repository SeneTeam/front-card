import React, { Component } from 'react';
import { QRCode } from 'react-qrcode-logo';
import FileSaver from "file-saver";
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';
const axios = require('axios');

export default class VCARD extends Component {
    constructor() {
        super();
        this.state = {
            token: '',
            openProductModal: false,
            qrdata: '',
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
        };
    }

    handleProductOpen = () => {
        this.setState({
            openProductModal: true,
        });
    };

    handleProductClose = () => {
        this.setState({ openProductModal: false });
    };

    componentDidMount() {
        let token = localStorage.getItem('token');
        if (!token) {
            this.props.history.push('/');
        } else {
            this.setState({ token: token }, () => {
                let guid_data = window.location.pathname.split("/")[1];
                axios.get(`http://localhost:2000/getdata`, {
                    headers: {
                        'token': this.state.token
                    }
                }).then((res) => {
                    let cnt = 0;
                    res.data.forEach(user => {
                        if (user.guid === guid_data) {
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
                            const d = new Date();
                            let createdAt = d.toISOString();
                            let vcardData =
                                `BEGIN:VCARD
                VERSION:3.0
                REV:${createdAt};
                FN:${user.name};
                TITLE:${user.title};
                EMAIL;type=HOME:${user.email};type=WORK:${user.office_email};
                TEL;type=MOBILE:${user.mobile};
                TEL;type=PHONE;type=VOICE;type=pref:${user.phone};
                ADR;type=HOME:${user.address};
                END:VCARD
                `;
                            this.setState({ qrdata: vcardData });
                        }
                    })
                    if (cnt === 0) {
                        this.props.history.push('/');
                    } else {
                    }
                }).catch((err) => {

                });
            });
        }

    }

    downloadVCF() {
        let stringData = this.state.qrdata;
        let file = new Blob(
            [stringData], { type: "text/vcard;charset=utf-8" }
        );
        FileSaver.saveAs(file, `vCard.vcf`, true);
    }

    render() {
        const downloadQR = () => {
            const canvas = document.getElementById("react-qrcode-logo");
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = "vcard.png";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        };
        return (

            <div>
                <div style={{ height: "35vh", borderRadius: "20px 20px 0 0" }}>
                    {
                        this.state.image ? <img src={`http://localhost:2000/${this.state.image}`} alt="John" className="user_avatar" />
                            : <img src="../alt.jpg" alt="John" className="user_avatar" />
                    }
                    <h2 style={{ color: "black" }}>{this.state.name}</h2>
                    <p className="title">{this.state.title}</p>
                </div>

                <div className="vcard_wrap">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "left" }}>
                            <tr>
                                <td><i className="fa fa-phone" aria-hidden="true"></i></td>
                                {
                                    this.state.mobile ? <td>Mobile: <div className="vcard_item">{this.state.mobile}</div></td>
                                        : <td>Mobile: <div className="vcard_item"></div></td>
                                }

                            </tr>
                            <tr>
                                <td></td>
                                {
                                    this.state.phone ? <td>Phone(Office): <div className="vcard_item">{this.state.phone}</div></td>
                                        : <td>Phone(Office): <div className="vcard_item"></div></td>
                                }
                            </tr>
                            <tr>
                                <td><i className="fa fa-envelope" aria-hidden="true"></i></td>
                                {
                                    this.state.email ? <td>Email: <div className="vcard_item">{this.state.email}</div></td>
                                        : <td>Email: <div className="vcard_item"></div></td>
                                }
                            </tr>
                            <tr>
                                <td></td>
                                {
                                    this.state.mobile ? <td>Office Email: <div className="vcard_item">{this.state.office_email}</div></td>
                                        : <td>Office Email: <div className="vcard_item"></div></td>
                                }
                            </tr>
                            <tr>
                                <td><i className="fa fa-address-card" aria-hidden="true"></i></td>
                                {
                                    this.state.address ? <td>Address: <div className="vcard_item">{this.state.address}</div></td>
                                        : <td>Address: <div className="vcard_item"></div></td>
                                }
                            </tr>
                            <tr>
                                <td><i className="fa fa-facebook-official" aria-hidden="true"></i></td>
                                {
                                    this.state.facebook ? <td>Facebook: <div className="vcard_item">{this.state.facebook}</div></td>
                                        : <td>Facebook: <div className="vcard_item"></div></td>
                                }
                            </tr>
                            <tr>
                                <td><i className="fa fa-whatsapp" aria-hidden="true"></i></td>
                                {
                                    this.state.whatsapp ? <td>Whatsapp: <div className="vcard_item">{this.state.whatsapp}</div></td>
                                        : <td>Whatsapp: <div className="vcard_item"></div></td>
                                }
                            </tr>
                            <tr>
                                <td><i className="fa fa-linkedin-square" aria-hidden="true"></i></td>
                                {
                                    this.state.linkedin ? <td>Linkedin: <div className="vcard_item">{this.state.linkedin}</div></td>
                                        : <td>Linkedin: <div className="vcard_item"></div></td>
                                }
                            </tr>
                            <tr>
                                <td><i className="fa fa-twitter-square" aria-hidden="true"></i></td>
                                {
                                    this.state.twitter ? <td>Twitter: <div className="vcard_item">{this.state.twitter}</div></td>
                                        : <td>Twitter: <div className="vcard_item"></div></td>
                                }
                            </tr>
                        </tbody>
                    </table>
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: "left" }}>
                            <tr>
                                <td><button type="button" className="btn btn-primary" onClick={this.handleProductOpen}><i className="fa fa-qrcode" aria-hidden="true"></i>&nbsp;SCAN</button></td>
                                <td><button type="button" className="btn btn-primary" onClick={() => this.downloadVCF()}><i className="fa fa-download" aria-hidden="true"></i>&nbsp;SAVE</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Dialog
                    open={this.state.openProductModal}
                    onClose={this.handleProductClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">QR CODE</DialogTitle>
                    <QRCode
                        id="123456"
                        value={this.state.qrdata}
                        padding={0}
                        size={332}
                        level={'H'}
                        logoWidth={100} />
                    <a onClick={downloadQR}> Download QR </a>
                    <DialogActions>
                        <Button onClick={this.handleProductClose} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}