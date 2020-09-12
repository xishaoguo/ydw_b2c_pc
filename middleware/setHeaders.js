import axios from 'axios';

export default function({ store }) {
  let userToken = store.state.userToken;
  if (userToken) {
    axios.defaults.headers['Authorization'] = userToken;
  }
}
