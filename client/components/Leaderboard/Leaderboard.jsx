import React from 'react';

class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        wat
        {this.renderPilots()}
      </div>
    );
  }

  renderPilots () {
    if(!this.props.leaderboardData.length){return};
    console.log('>->', this.props.leaderboardData);
    const listPilots = this.props.leaderboardData.map((pilot, i) => {
      console.log('>>', pilot);
      return <li key={i}>{pilot.pilot.gsx$name.$t}</li>;
    });
    return <ul>{listPilots}</ul>;
  }

}

export default Leaderboard;
