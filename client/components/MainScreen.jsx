import React from 'react';
import Leaderboard from './Leaderboard/Leaderboard.jsx';

class MainScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount () {
    document.querySelector('video').play();
  }

  render(props) {
    return (
      <div className="main-screen">
        <div className="video-background">
          <video loop >
            <source src="http://droneproject.org/wp-content/uploads/2017/08/luces_inicio_1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="meta">
          <img className="race-title" src="http://droneproject.org/wp-content/uploads/2017/07/top_logo_neonrace_landingfinal.png" alt="Neon Race"/>
        </div>
        <Leaderboard leaderboardData={this.props.leaderboardData}/>
      </div>
    );
  }

}

export default MainScreen;
