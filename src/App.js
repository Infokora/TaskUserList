import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import Router from './Router';
import { reducers } from './reducers/index';
import { logger } from 'redux-logger';

export default class App extends Component {
	render() {
		const store = createStore(
			reducers,
			{},
			applyMiddleware(ReduxThunk, logger)
		);
		return (
			<Provider store={store}>
				<Router/>
			</Provider>
		)
	}
}