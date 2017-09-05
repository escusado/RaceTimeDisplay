import React from 'react';
import Leaderboard from './Leaderboard/Leaderboard.jsx';

class MainScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  render(props) {
    return (
      <div>
        <Leaderboard leaderboardData={this.props.leaderboardData}/>
        this many: {Object.keys(this.props)}
      </div>
    );
  }

}

export default MainScreen;
