import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import { MDBContainer, MDBRow, MDBCol, MDBButton } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { BiEqualizer } from 'react-icons/bi';
import { BsExclamationDiamondFill } from 'react-icons/bs';
import { BsPersonPlus } from 'react-icons/bs';


class BandProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bandId: null,
      bandName: null,
      bandImageUrl: null,
      followers: null,
      tracks: null
    };
    this.updateBio = this.updateBio.bind(this);
    this.getRandomInt = this.getRandomInt.bind(this);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  updateBio(data) {
    console.log('Data from GET request: ', data);
    this.setState({
      bandId: data.bandId,
      bandName: data.bandName,
      bandImageUrl: data.bandImageUrl,
      followers: data.followers,
      tracks: data.tracks
    });
  }



  componentDidMount() {
    axios.get('/artistBio/2')
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
        <button className="follow-btn"><BsPersonPlus className="follow-icon" />Follow</button>
        <ul>
          <li>
            <BsExclamationDiamondFill className="report-icon" /> <span className="report-text">Report</span>
          </li>
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<BandProfile />, document.getElementById('artist-bio'));

/*
      <div className="cam artist-bio">
        <img className="band-image" src={this.state.bandImageUrl}/>
        <h3 className="band-name">{this.state.bandName}</h3>
      </div>

         <MDBContainer size="sm">
        <MDBRow>
          <MDBCol md="4" className="mb-3 text-center">
            <img className="img-thumbnail rounded-circle" src={this.state.bandImageUrl}></img>
          </MDBCol>
          <MDBCol md="4" className="mb-3 text-center">
            <img className="img-thumbnail rounded-circle" src={this.state.bandImageUrl}></img>
          </MDBCol>
          <MDBCol md="4" className="mb-3 text-center">
            <img className="img-thumbnail rounded-circle" src={this.state.bandImageUrl}></img>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
*/