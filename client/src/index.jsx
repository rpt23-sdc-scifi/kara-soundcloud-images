import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import BandProfile from './BandProfile.jsx';
import css from '../../client/stylesheet.css';

// ReactDOM.render(<BandProfile />, document.getElementById('artist-bio'));

ReactDOM.render(React.createElement(BandProfile, null, null), document.getElementById('artist-bio'));