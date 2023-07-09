import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
       <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/home" className="navbar-brand">Ranking Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
          <Link to="/rankdata" className="nav-link">Rankings</Link>
          </li>
          <li className="nav-item">
          <Link to="/upload" className="nav-link">Upload</Link>
          </li>
        </ul>
        </div>
      </nav>
     );
  }
}
