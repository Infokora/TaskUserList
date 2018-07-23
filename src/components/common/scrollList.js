import React, {Component} from 'react';
import {
  FlatList,
  RefreshControl
} from 'react-native';
import propTypes from 'prop-types';

import {Spinner} from '@common';

export class ScrollList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      extraData: null,
      loading: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
  }

  keyExtractor = (item, index) => item.id.toString();

  refreshData(func, loading) {
    if(this.state[loading]) return;

    this.setState({
      [loading]: true
    }, () => func().finally(() => {
      this.setState({[loading]: false});
    }));
  }

  renderItem(item) {
    return this.props.renderItem(item.item, item.index);
  }

  renderFooter() {
    if(this.state.loading) return null;

    return (
      <Spinner/>
    )
  }

  refreshControll() {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.refreshData.bind(this, this.props.eventRefresh, 'refresh')}
      />
    )
  }

  render (){
    const {data, loadMoreItems, ListHeaderComponent} = this.props;

    return (
      <FlatList
        data={data}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem.bind(this)}
        refreshControl={this.refreshControll.call(this)}
        onEndReached={this.refreshData.bind(this, loadMoreItems, 'loading')}
        onEndReachedThreshold={0}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={this.renderFooter.bind(this)}
      />
    )
  };
};

ScrollList.propTypes = {
  data: propTypes.array.isRequired,
  stub: propTypes.element,
  eventRefresh: propTypes.func.isRequired,
  loadMoreItems: propTypes.func.isRequired
};
