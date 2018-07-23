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

import {
  UserCard,
  Spinner,
  ScrollList
} from '@common';
import {
  actionUsers,
  actionFollowers
} from '@actions';

class Followers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: ''
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
  
  componentDidMount() {
    this.setState({loading: true}, this.followersLoading.bind(this, this.props.login));
  }

  followersLoading(login, since) {
    return this.props.actionFollowers(login, since)
      .catch(error => this.setState({error: error.message}))
      .finally(() => {
        this.setState({loading: false})
        return Promise.resolve('End');
      });
  }

  loadingMoreFollowers() {
    console.log('last id', this.props.users.followers[this.props.users.followers.length - 1].id);
    const since = this.props.users.followers[this.props.users.followers.length - 1].id;

    return this.props.actionFollowers(this.props.login, since)
      .catch(error => this.setState({error: error.message}))
      .finally(() => Promise.resolve('End'));
  }

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

  moveToBrowser(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch((err) => {
      console.error('An error occurred', err)
    });
  }

  renderItem(item) {
    return (
      <UserCard
        login={item.login}
        avatar_url={item.avatar_url}
        profileMove={this.moveToBrowser.bind(this, item.html_url)}
        html_url={item.html_url}
        showFollowers={() => {}}
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
              data={this.props.users.followers}
              renderItem={this.renderItem.bind(this)}
              eventRefresh={this.followersLoading.bind(this)}
              loadMoreItems={this.loadingMoreFollowers.bind(this)}
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
)(Followers);

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
