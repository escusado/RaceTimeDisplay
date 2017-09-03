import React from 'react';

var ROUNDS = 15;

class DataHandler extends React.Component {

  constructor(props) {
    super(props);
  }

  processData (data) {
    return {
      leaderboard: this.getLeaderboard(data)
    };
  }

  getLeaderboard (pilotData) {
    let leaderboard = [];

    // console.log('>', pilotData);

    pilotData.forEach(function (pilot, i) {
      let bestRoundTime = 9999999;
      let bestRoundIndex = 0;
      for (let j=1; j<=ROUNDS; j++) {
        let currentRound = pilot['gsx$round'+j].$t;

        if(currentRound==='DNF'){
          continue;
        }

        let currentRoundMinutesToSeconds = parseFloat(currentRound.split(':')[0]) * 60;
        let currentRoundSeconds = parseFloat(currentRound.split(':')[1]);
        let totalRoundSeconds = currentRoundMinutesToSeconds + currentRoundSeconds;

        if (totalRoundSeconds < bestRoundTime ) {
          bestRoundTime = totalRoundSeconds;
          bestRoundIndex = j;
        }

      }
      leaderboard.push({
        pilot : i,
        bestRoundTime,
        bestRoundIndex
      });
    });

    leaderboard.sort((a, b) => a.bestRoundTime - b.bestRoundTime)

    return leaderboard;
  }

}

export default DataHandler;
