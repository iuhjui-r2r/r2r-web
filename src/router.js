import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';


import { HomePage,DiskPage } from './pages';


export default function({ history }) {
	return (
		<Router history={history}>
			<Route path="/" component={ HomePage } >
				<IndexRoute component = { DiskPage } />
			</Route>
		</Router>
	);
};
