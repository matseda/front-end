import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {users: [], info: {degrees: 0, wind: 0}};
    this.findData=this.findData.bind(this)
  }

  componentDidMount() {
    fetch('/cities')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  findData(event) {
    var cityData = JSON.parse(event.target.value);
    fetch('/cities/degrees/'+ cityData.id)
      .then(res => res.json())
      .then(info => this.setState({ info }));
    var weatherInfo = JSON.parse(JSON.stringify(this.state.info));
    document.getElementById("info").innerHTML = "City selected: " + cityData.city;
    document.getElementById("temperature").innerHTML = "Temperature: " + weatherInfo.degrees;
    document.getElementById("wind").innerHTML = "Wind: " + weatherInfo.wind;
    console.log("City: " + event.target.value);
    console.log("City: " + weatherInfo);
  } 

  render() {
    return (
      <div className="App">
        <div>
          <h1>Weather application</h1>
          <select id="cityChoose" onChange={this.findData}> 
            {this.state.users.map(user =>
              <option value={JSON.stringify(user)} id={user.id} key={user.id}>{user.city}</option>
            )}
          </select>
        </div>
        <div>
          <h3 id="info">Select a city</h3>
        </div>
        <div>
          <b id="temperature">Temperature:</b>
        </div>
        <div>
          <b id="wind">Temperature:</b>
        </div>
      </div>
    );
  }
}

export default App;