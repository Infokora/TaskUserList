import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Linking,
  StyleSheet
} from 'react-native';
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';

import {
  UserCard,
  Spinner,
  ScrollList
} from '@common';

import {
  actionUsers,
  actionFollowers
} from '@actions';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: '',
    }
  }

  static propTypes = {
    users: propTypes.object,
    actionUsers: propTypes.func.isRequired,
    actionFollowers: propTypes.func.isRequired
  };

  static defaultProps = {
    users: {},
    actionUsers: () => {},
    actionFollowers: () => {}
  };

  errorMsg() {
    if (this.state.error) {
      return (
        <Text style={style.error}>
          {this.state.error}
        </Text>
      );
    } else {
      return null
    }
  }

  componentDidMount() {
    this.setState({loading: true}, this.userLoading.bind(this));
  }

  userLoading(since) {
    return this.props.actionUsers(since)
      .then(res => console.log(res))
      .catch(error => this.setState({error: error.message}))
      .finally(() => {
        this.setState({loading: false})
        return Promise.resolve('End');
      });
  }

  loadingMoreUsers() {
    return this.userLoading(this.props.users.data[this.props.users.data.length - 1].id)
      .catch(error => this.setState({error: error.message}))
      .finally(() => Promise.resolve('End'));
  }

  // startFollowersLoading() {
  //   this.setState({loading: true}, this.followersLoading.bind(this));
  // }

  // followersLoading(login) {
  //   return this.props.actionFollowers(login)
  //     .then(res => Actions.followers({title: `Followers ${login}`}))
  //     .catch(error => this.setState({error: error.message}))
  //     .finally(() => {
  //       this.setState({loading: false})
  //       return Promise.resolve('End');
  //     });
  // }

  moveToBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch((err) => {
      console.error('An error occurred', err);
    });
  }

  renderItem(item) {
    return (
      <UserCard
        login={item.login}
        avatar_url={item.avatar_url}
        profileMove={this.moveToBrowser.bind(this, item.html_url)}
        html_url={item.html_url}
        showFollowers={() => Actions.followers({login: item.login})}
      />
    )
  }

  render() {
    return (
      <View style={style.main}>
        {
          this.state.loading ?
            <Spinner/>
            :
            <ScrollList
              ListHeaderComponent={this.errorMsg.bind(this)}
              data={this.props.users.data}
              renderItem={this.renderItem.bind(this)}
              eventRefresh={this.userLoading.bind(this)}
              loadMoreItems={this.loadingMoreUsers.bind(this)}
            />
        }
      </View>
    )
  };
}

export default connect(
  ({
     users
   }) => {
    return {
      users
    }
  }, {
    actionUsers,
    actionFollowers
  }
)(UsersList);

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  error: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 22,
  }
});
