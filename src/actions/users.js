import {
  usersTypes,
} from '@actions';

import {Api} from "../components/Api";

export const actionUsers = (since) => dispatch => {
  console.log(since, since? usersTypes.LOADEDPLUS : usersTypes.LOADED);
  return Api.loadingUsers(since)
    .then(res => {
      dispatch({
        type: since !== 0? usersTypes.LOADEDPLUS : usersTypes.LOADED,
        payload: res.data
      });
      return Promise.resolve(res);
    }).catch(error => Promise.reject(error));
};

export const actionFollowers = (login, since) => dispatch => {
  return Api.loadingFollowers(login, since)
    .then(res => {
      dispatch({
        type: since !== 0? usersTypes.FOLLOWERS_LOADEDPLUS : usersTypes.FOLLOWERS_LOADED,
        payload: res.data
      });
      return Promise.resolve(res);
    }).catch(error => Promise.reject(error));
};