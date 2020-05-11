import React, { Component } from "react";
import axios from "axios";
import "../App.css";

import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
class Home extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      hero: "",
      loaderShow: false,
      heroCardShow: false,
      noheroCardShow: false,
      text: "",
    };
  }

  inputValidation = () => {
    console.log(this.state.code);
    console.log(this.state.code.charAt(0));

    if (this.state.code === "") {
      this.setState({
        noheroCardShow: true,
        text: "Don't enter a blank response",
      });
      return 0;
    }

    if (this.state.code.charAt(0) !== "0") {
      console.log("in not 0");
      this.setState({ noheroCardShow: true, text: "0 missing at first place" });
      return 0;
    }

    if (this.state.code.charAt(1) !== " ") {
      this.setState({
        noheroCardShow: true,
        text: "Space missing after 0 at second place",
      });
      return 0;
    }

    return 1;
  };

  sendCode = () => {
    if (this.inputValidation() === 0) {
    } else {
      console.log("In sendCode", this.state.code);
      this.setState({ loaderShow: true });
      axios
        .post("/api/getAll", {
          code: this.state.code,
        })
        .then((response) => {
          console.log("Get response: ");
          if (response.data.Hero) {
            console.log("In if", response.data);

            this.setState({
              hero: response.data.Hero,
              loaderShow: false,
              heroCardShow: true,
              text: `${response.data.Hero} has been informed !!!`,
            });
          } else {
            console.log("No Hero Found");
            this.setState({
              loaderShow: false,
              noheroCardShow: true,
              text: "No Hero Found",
            });
          }
        });
    }
  };

  btnClick = (code) => {
    console.log("In btnClick", code);

    if (code !== "space") {
      console.log("in if");

      let d = this.state.code;
      let f = d.concat(code);

      this.setState({
        code: f,
      });
    } else {
      let d = this.state.code;

      let f = d.concat(" ");

      this.setState({
        code: f,
      });
    }

    console.log("Code::", this.state.code);
  };

  cancelClick = () => {
    this.setState({
      code: "",
      hero: "",
      loaderShow: false,
      heroCardShow: false,
      noheroCardShow: false,
      text: "",
    });
  };
  render() {
    return (
      <div className="d-md-flex h-md-100 align-items-center corecon">
        <div className="col-md-6 p-0 h-md-100">
          <div className="d-md-flex align-items-center h-100 p-5 text-center justify-content-center">
            <div className="pt-5 pb-5">
              <Card className="cardH">
                <Card.Body>
                  <Card.Title>Crime Zero Inc</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Helps in Times Of Distress
                  </Card.Subtitle>
                  <Card.Text>
                    To Call for help dial (0 SuperHero Code)
                  </Card.Text>
                  <Card.Text>Press * to send sms.</Card.Text>
                </Card.Body>
              </Card>

              {this.state.loaderShow && (
                <Spinner
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                  className="spinner"
                />
              )}
              {this.state.heroCardShow && (
                <Card className="card2">
                  <Card.Body>
                    <Card.Title>{this.state.text}</Card.Title>
                  </Card.Body>
                </Card>
              )}
              {this.state.noheroCardShow && (
                <Card className="card2">
                  <Card.Body>
                    <Card.Title>{this.state.text}</Card.Title>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 p-0 h-md-100">
          <div className="pt-5 pb-5">
            <div className="dpcontainer">
              <h6 className="dialHeading">Call SuperHero To Your Rescue</h6>
              <div id="output">
                {this.state.code}{" "}
                <i
                  className="fa fa-times cl"
                  onClick={() => this.cancelClick()}
                ></i>
              </div>
              <div className="dprow">
                <div className="digit" id="one">
                  1
                </div>
                <div
                  className="digit"
                  id="two"
                  onClick={() => {
                    this.btnClick(2);
                  }}
                >
                  2<div className="sub">ABC</div>
                </div>
                <div
                  className="digit"
                  id="three"
                  onClick={() => {
                    this.btnClick(3);
                  }}
                >
                  3<div className="sub">DEF</div>
                </div>
              </div>
              <div className="dprow">
                <div
                  className="digit"
                  id="four"
                  onClick={() => {
                    this.btnClick(4);
                  }}
                >
                  4<div className="sub">GHI</div>
                </div>
                <div
                  className="digit"
                  id="five"
                  onClick={() => {
                    this.btnClick(5);
                  }}
                >
                  5<div className="sub">JKL</div>
                </div>
                <div
                  className="digit"
                  onClick={() => {
                    this.btnClick(6);
                  }}
                >
                  6<div className="sub">MNO</div>
                </div>
              </div>
              <div className="dprow">
                <div
                  className="digit"
                  onClick={() => {
                    this.btnClick(7);
                  }}
                >
                  7<div className="sub">PQRS</div>
                </div>
                <div
                  className="digit"
                  onClick={() => {
                    this.btnClick(8);
                  }}
                >
                  8<div className="sub">TUV</div>
                </div>
                <div
                  className="digit"
                  onClick={() => {
                    this.btnClick(9);
                  }}
                >
                  9<div className="sub">WXYZ</div>
                </div>
              </div>
              <div className="dprow">
                <div
                  className="digit"
                  onClick={() => {
                    this.sendCode();
                  }}
                >
                  *<div className="sub">send</div>
                </div>
                <div
                  className="digit"
                  onClick={() => {
                    this.btnClick(0);
                  }}
                >
                  0
                </div>
                <div
                  className="digit"
                  onClick={() => {
                    this.btnClick("space");
                  }}
                >
                  #<div className="sub">space</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
