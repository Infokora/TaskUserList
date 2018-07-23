import React, {Component} from 'react';
import {
  Scene,
  Router,
  ActionConst
} from 'react-native-router-flux';

import UsersList from './components/pages/usersList';
import Followers from './components/pages/followers';

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            type={ActionConst.RESET}
            key="usersList"
            component={UsersList}
            title={'Github users'}
            initial
          />

          <Scene
            key="followers"
            component={Followers}
            title={'Followers'}
            back
          />
        </Scene>
      </Router>
    );
  };
};