import polyfill from 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import api from './middleware/api';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import reducer from './reducers/reducers';

import Welcome from './views/Welcome';
import Library from './views/Library';
import Search from './views/Search';
import Register from './views/Register';
import Login from './views/Login';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="library" component={Library} />
        <Route path="search" component={Search} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));

// ReactDOM.render(<App />, document.);
