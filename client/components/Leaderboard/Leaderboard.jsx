import React from 'react';
import ReactDOM from 'react-dom';

class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.direction = 1;
    this.previousScroll = 0;
  }

  pageScroll () {
    const node = document.querySelector('.leaderboard');
    node.scrollTop += this.direction;
    if(node.scrollTop === this.previousScroll) {
      this.direction *= -1;
    }
    this.previousScroll = node.scrollTop;
    setTimeout(this.pageScroll.bind(this),100);
  }

  render() {
    const style = {
      height : Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 150 + 'px',
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)/2
    };
    return (
      <div className="leaderboard" style={style}>
        {this.renderPilots()}
      </div>
    );
  }

  renderPilots () {
    if(!this.props.leaderboardData.length){return};
    const listPilots = this.props.leaderboardData.map((pilot, i) => {
      console.log('>', pilot);
      let className = 'pilot place-' + i;
      className += i < 3 ? ' top-3' : '';
      className += i > 14 ? ' terror' : '';
      return <div className={className} key={i}>
              <div className="place">{i+1}.</div>
              <div className="icon"></div>
              <div className="name"> {pilot.data.name}</div>
              <div className="onheat">heat {pilot.data.onheat}{pilot.data.emoji}</div>
              <div className="time"> {pilot.data['round'+pilot.bestRoundIndex]}</div>
             </div>;
    });
    this.pageScroll();
    return <div className="pilot-list">{listPilots}</div>;
  }

}

export default Leaderboard;
