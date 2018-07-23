import {
  usersTypes
} from '../actions/types';

const initial_state = {
  data: [],
  followers: []
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case usersTypes.LOADED:
      return {
        ...state,
        data: action.payload
      };

    case usersTypes.LOADEDPLUS:
      return {
        ...state,
        data: state.data.concat(action.payload)
      };

    case usersTypes.FOLLOWERS_LOADED:
      return {
        ...state,
        followers: action.payload
      };

    case usersTypes.FOLLOWERS_LOADEDPLUS:
      return {
        ...state,
        followers: state.followers.concat(action.payload)
      };

    case usersTypes.LOGOUT:
      return state;

    default:
      return state
  }
}
