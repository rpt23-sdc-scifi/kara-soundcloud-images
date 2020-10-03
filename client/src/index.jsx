import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class BandProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArtist: 1
    };
    this.updateBio = this.updateBio.bind(this);
  }

  updateBio(data) {
    this.setState({
      currentArtist: data
    });
  }

  componentDidMount() {
    $.get(
      {
        url: '/artistBio/1',
        data: {},
        success: data => this.updateBio(data),
        error: error => console.log(error)
      }
    );
  }

  render () {
    return (
      <div className="cam artist-bio">
        <img key="image" src="https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg"/>
        <p>TEST!</p>
      </div>
    );
  }
}

ReactDOM.render(<BandProfile />, document.getElementById('artist-bio'));