import React from 'react';
import ReactDOM from 'react-dom';

class Leaderboard extends React.Component {

  constructor(props) {
    super(props);
    this.direction = 1;
    this.previousScroll = 0;
    this.newTagStillThere = false;
    this.scrollTimeout;
  }

  pageScroll () {
    if (this.newTagStillThere) {
      this.newTagStillThere = false;
      console.log('wat');
      document.querySelectorAll('.leaderboard .pilot').forEach((el, i)=>{
        setTimeout(()=>{
          el.classList.add('new');
        }, 50 * i);

        setTimeout(()=>{
          el.classList.remove('new');
        }, (50 * i) + 400);
      });
    }

    const node = document.querySelector('.leaderboard');
    node.scrollTop += this.direction;
    if(node.scrollTop === this.previousScroll) {
      this.direction *= -1;
    }
    this.previousScroll = node.scrollTop;
    this.scrollTimeout = setTimeout(this.pageScroll.bind(this),100);
  }

  render() {
    return (
      <div className="leaderboard">
        {this.renderPilots()}
      </div>
    );
  }

  renderPilots () {
    if(!this.props.leaderboardData.length){return};
    const listPilots = this.props.leaderboardData.map((pilot, i) => {
      let className = 'pilot place-' + i;
      className += i < 3 ? ' top-3' : '';
      className += i > 14 ? ' terror' : '';
      return <div className={className} key={i}>
              <div className="place">{i+1}.</div>
              <div className="icon"></div>
              <div className="name"> {pilot.data.name}</div>
              <div className="onheat">heat {pilot.data.onheat} <span className="emoji">{pilot.data.emoji}</span></div>
              <div className="time"> {pilot.data['round'+pilot.bestRoundIndex]}</div>
             </div>;
    });
    this.newTagStillThere = true;
    clearTimeout(this.scrollTimeout);
    this.pageScroll();
    return <div className="pilot-list">{listPilots}</div>;
  }

}

export default Leaderboard;
