import React from 'react';
import Leaderboard from './Leaderboard/Leaderboard.jsx';

class MainScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount () {
    // document.querySelector('video').play();
  }

  render(props) {
    return (
      <div className="main-screen">
        <div className="video-background">
        </div>
        <div className="meta">
        </div>
        <Leaderboard leaderboardData={this.props.leaderboardData}/>
      </div>
    );
  }

}

export default MainScreen;
