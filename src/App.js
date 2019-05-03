import logo from "../src/logo.png";
import "./App.css";
import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import Image from "../src/background.png";

class App extends Component {
  state = {
    date: new Date(),
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    output: ""
  };

  onChange = date => this.setState({ date });

  onSubmitHandler = () => {
    console.log("submtted");
    let date = this.state.date;

    let countDownDate = new Date(date).getTime();

    let x = setInterval(() => {
      let now = new Date().getTime();

      let distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.setState({
        days,
        hours,
        minutes,
        seconds
      });

      // this.setState({
      //   output:`${days}d ${hours}h ${minutes}m ${seconds}s`
      // })

      if (distance < 1) {
        console.log(distance);
        clearInterval(x);
        this.setState({ output: "Expired" });
      }
    }, 1000);

    this.setState({ x: x });
  };
  renderOutput = () => {
    return (
      <div>
        <h1>
          {this.state.days}:{this.state.hours}:{this.state.minutes}:
          {this.state.seconds}
        </h1>
      </div>
    );
  };

  onStopHandler = () => {
    clearInterval(this.state.x);
    this.setState({
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00"
    });
  };

  render() {
    return (
      <div>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Countdown Timer</h2>
          </div>
        </div>

        <div className="container App app mx-auto">
          <div className="card border-dark mb-3 mycard $enable-shadows shadow-sm">
            <div
              className="image myflex"
              style={{ textAlign: "center", margin: "5%" }}
            >
              <img
                src={Image}
                style={{ borderRadius: "75%", width: "25%", height: "25%" }}
              />
            </div>
            <div className="myrow">
              <DateTimePicker
                onChange={this.onChange}
                value={this.state.date}
                className="picker"
              />
            </div>
            <div className="card-body text-dark myrow2">
              <h4 className="card-title myrow">{this.renderOutput()}</h4>
              <div className="myrow">
                <button
                  onClick={this.onSubmitHandler}
                  type="button"
                  className="btn button start"
                >
                  Start
                </button>

                <button
                  onClick={this.onStopHandler}
                  type="button"
                  className="btn button stop"
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
