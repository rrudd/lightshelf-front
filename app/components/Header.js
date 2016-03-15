import React from 'react';
import { Link } from 'react-router';
import Button from './Button';

export default () =>
  (<div className="row header">
    <div className="six columns">
      <Link to="/">
        <img className="logo u-max-full-width " src="./img/EPS_RGB_WHITE_10.png" />
      </Link>
    </div>
    <div className="six columns">
      <div className="nav">
        <Link to="/library">
          <Button
            text="library"
            type="nav-btn"
            icon="fa fa-book"
          />
        </Link>
        <Link to="/search">
          <Button
            text="add book"
            type="nav-btn"
            icon="fa fa-search"
          />
        </Link>
      </div>
    </div>
  </div>);
