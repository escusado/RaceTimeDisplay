import React from 'react';
import MainScreen from './MainScreen.jsx';
import Axios from 'axios';
import DataHandler from './DataHandler.jsx';

const CHECK_INTERVAL = 5000;

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.dataHandler = new DataHandler();
    this.previousResponse = '';
    this.state = {
      leaderboardData:{}
    };

    setTimeout(()=>{location.reload();}, 120000);
  }

  componentDidMount() {
    Axios.get("https://spreadsheets.google.com/feeds/list/1Nbx93-l9X2MWlnuzIWzbSkQEZu9e8Dour8J9AaO-4zg/od6/public/values?alt=json")
    .then(this.handleResponse.bind(this));
  }

  render() {
    return (
      <div  className="app">
        <MainScreen leaderboardData={this.state.leaderboardData}/>
      </div>
    );
  }

  handleResponse (res) {
    const response = JSON.stringify(res.data.feed.entry);

    if (this.previousResponse != response) {
      this.setState(this.dataHandler.processData(res.data.feed.entry));
    }
    this.previousResponse = response;
    setTimeout(this.componentDidMount.bind(this), CHECK_INTERVAL);
  }
}
