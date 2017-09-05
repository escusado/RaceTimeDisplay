import React from 'react';
import MainScreen from './MainScreen.jsx';
import Axios from 'axios';
import DataHandler from './DataHandler.jsx';

const CHECK_INTERVAL = 1000;

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.dataHandler = new DataHandler();
    this.state = {
      leaderboardData:{}
    };
  }

  componentDidMount() {
    Axios.get("https://spreadsheets.google.com/feeds/list/1Nbx93-l9X2MWlnuzIWzbSkQEZu9e8Dour8J9AaO-4zg/od6/public/values?alt=json")
    .then(this.handleResponse.bind(this));
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Hello </h1>
        <MainScreen leaderboardData={this.state.leaderboardData}/>
      </div>
    );
  }

  handleResponse (res) {
    this.setState(this.dataHandler.processData(res.data.feed.entry));
    // setTimeout(this.componentDidMount.bind(this), CHECK_INTERVAL);
  }
}
