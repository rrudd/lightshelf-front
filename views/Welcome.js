import React from 'react';
import { Link } from 'react-router';
import Button from '../components/button';

export default () =>
  (<div>
    <div className="row first-component centralize">
        <h1>Welcome to Lightshelf, the Netlight library!</h1>
    </div>
    <div className="row centralize">
      <div>
        <Link to="login">
          <Button
            type="button-primary-netlight"
            text="login"
          />
        </Link>
      </div>
      <div>or</div>
      <div>
        <Link to="register">
          <Button
            type="button-primary-netlight"
            text="register"
          />
        </Link>
      </div>
    </div>
  </div>);
