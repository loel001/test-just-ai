import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import User from "../user/user";
import {getNotFavoritetUsers} from '../../common/utils';

const UserList = ({users, item, filter}) => {
  const [openedList, setOpenedList] = useState(false);

  const handleClick = () => {
    setOpenedList(!openedList);
  };

  const items = useMemo(() => {
    if (filter) {
      return users.filter((user) => {
        const matchValue = filter.toLowerCase();
        if (user.name.first.toLowerCase().includes(matchValue)) {
          return true;
        } else if (user.name.last.toLowerCase().includes(matchValue)) {
          return true;
        }
        return false;
      });
    }
    return users;
  }, [filter, users]);

  return (
    <table className="main-page__users users">
      <thead>
        <tr className="users__title">
          <td className={`${getNotFavoritetUsers(items).length > 0 ? `` : `list--disabled`}`} onClick={handleClick}>{item}</td>
        </tr>
      </thead>
      <tbody className={`list ${openedList === false ? `` : `list--hide`}`}>
        {getNotFavoritetUsers(items).map((user) => (
          <User
            key={user.indexSearch}
            user={user}
            filter={filter}
          />
        ))}
      </tbody>
    </table>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  item: PropTypes.string.isRequired,
  filter: PropTypes.any
};

export default UserList;
