import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { BiEqualizer } from 'react-icons/bi';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import { BsPersonPlus } from 'react-icons/bs';
import { FaUserCheck } from '@fortawesome/free-solid-svg-icons';

class BandProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bandId: null,
      songId: null,
      bandName: null,
      bandImageUrl: null,
      followers: null,
      tracks: null,
      isFollowing: false
    };
    this.updateBio = this.updateBio.bind(this);
    this.handleFollowClick = this.handleFollowClick.bind(this);
  }

  updateBio(data) {
    console.log('Data from GET request: ', data);
    this.setState({
      bandId: data.bandId,
      songId: data.songId,
      bandName: data.bandName,
      bandImageUrl: data.bandImageUrl,
      followers: data.followers,
      tracks: data.tracks
    });
  }

  handleFollowClick(event) {
    console.log('Follow Button Clicked!!');
  }

  componentDidMount() {
    let splitUrl = window.location.href.split('/');
    console.log('URL: ', splitUrl);
    let songId = splitUrl[3];
    axios.get(`/artistBio/${songId}`)
      .then((response) => {
        console.log('Response from initial render GET: ', response.data.data);
        this.updateBio(response.data.data);
      })
      .catch((error) => {
        console.log('Error setting initial state: ', error);
      });
  }

  render () {
    return (
      <div className="cam artist-bio">
        <img className="band-image" src={this.state.bandImageUrl}/>
        <h3 className="band-name">{this.state.bandName}</h3>
        <div className="user-stats">
          <ul>
            <li>
              <FontAwesomeIcon className="followers-icon" icon={faUserFriends}/> <span className="followers">{this.state.followers}</span><BiEqualizer className="tracks-icon" /> <span className="tracks">{this.state.tracks}</span>
            </li>
          </ul>
        </div>
        <button className="follow-btn" onClick={this.handleFollowClick}><BsPersonPlus className="follow-icon" />Follow</button>
        <ul>
          <li>
            <BsExclamationDiamondFill className="report-icon" /> <span className="report-text">Report</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default BandProfile;

// check state and render component based on true/false