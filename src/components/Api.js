import axios from 'axios';

export const host = 'https://api.github.com';

const api = {
  // USER
  users: '/users',
  followers: '/followers',
};

const http = axios.create({
  baseURL: host,
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  },
});

class ApiCreate {
  loadingUsers(since = 0) {
    return http.get(`${api.users}?since=${since}`)
      .then(res => {
        console.log(res);
        return Promise.resolve(res)
      })
      .catch(error => {
        console.dir(error);
        return Promise.reject(error)
      });
  }

  loadingFollowers(login, since = 0) {
    return http.get(`${api.users}/${login}${api.followers}?since=${since}`)
      .then(res => {
        console.log(res);
        return Promise.resolve(res)
      })
      .catch(error => {
        console.dir(error);
        return Promise.reject(error)
      });
  }
}

export const Api = new ApiCreate();
