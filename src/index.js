import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';

import StolenBikes from './components/stolen_bikes';
import StolenBikeDetail from './components/stolen_bike_detail';

import reducer from './reducers';

import '../style/style.scss';

/* eslint-disable no-underscore-dangle */
const store = createStore(reducer, applyMiddleware(thunk));
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={StolenBikes} />
        <Route path="/incident/:id" component={StolenBikeDetail} />
      </div>
    </Router>
  </Provider>,
  document.querySelector('#root'),
);
