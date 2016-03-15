import React from 'react';
import { Link } from 'react-router';
import Button from '../components/button';
import {connect} from 'react-redux';

class Welcome extends React.Component {

  render() {
    return (<div>
      <div className="row first-component centralize">
          <h1>Welcome to Lightshelf, the Netlight library!</h1>
      </div>
     { this.props.isAuthorized ? null :
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
        }
    </div>);
  }
}

export default connect(
    (state)=> {
      return {
        isAuthorized: state.auth.isAuthorized
      }
    }
)(Welcome);