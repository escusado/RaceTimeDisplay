import React from 'react';
import AwesomeComponent from './AwesomeComponent.jsx';
import Axios from 'axios';
import DataHandler from './DataHandler.jsx';

export default class App extends React.Component {

  constructor () {
    super();
    this.dataHandler = new DataHandler();

    Axios.get("https://spreadsheets.google.com/feeds/list/1Nbx93-l9X2MWlnuzIWzbSkQEZu9e8Dour8J9AaO-4zg/od6/public/values?alt=json")
    .then(this.handleResponse.bind(this));
  }

  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello </h1>
        <AwesomeComponent />
      </div>);
  }

  handleResponse (res) {
    var processedData = this.dataHandler.processData(res.data.feed.entry);
    console.log('processedData', processedData);
  }
}
