import {
  loadUsers,
} from './action';
import {addIsFavorite} from '../common/utils';

export const fetchUserList = () => (dispatch, _getState, api) => (
  api.get(`api/?results=1000&nat=us&inc=name,id,registered,email,picture&noinfo`)
    .then(({data}) => {
      dispatch(loadUsers(addIsFavorite(data.results)));
    })
    .catch(() => {})
);
