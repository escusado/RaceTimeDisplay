import React from 'react';

var ROUNDS = 9;

class DataHandler extends React.Component {

  constructor(props) {
    super(props);
  }

  processData (data) {
    return {
      leaderboardData: this.getLeaderboardData(data)
    };
  }

  getLeaderboardData (pilotData) {
    let leaderboardData = [];
    let previousPilotBestRoundTime = 0;

    // console.log('>', pilotData);

    pilotData.forEach( (pilot, i) => {
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
      if (pilot.gsx$name.$t.indexOf('Pilot Name')>-1) {
        return;
      }

      leaderboardData.push({
        pilotIndex : i,
        data : this.parsePilot(pilot),
        bestRoundTime,
        bestRoundIndex,
      });
    });

    leaderboardData.sort((a, b) => a.bestRoundTime - b.bestRoundTime)

    leaderboardData.forEach( (pilot, i) => {
      pilot.topGap = pilot.bestRoundTime - previousPilotBestRoundTime
      previousPilotBestRoundTime = pilot.bestRoundTime;
    });

    return leaderboardData;
  }

  parsePilot (pilotData) {
    let pilot = {};
    pilotData.content.$t.split(', ').forEach( (keyValuePair, i) => {
      pilot[keyValuePair.split(': ')[0]] = keyValuePair.split(': ')[1];
    });
    pilot.present = parseInt(pilotData.gsx$present.$t);
    return pilot;
  }

}

export default DataHandler;
