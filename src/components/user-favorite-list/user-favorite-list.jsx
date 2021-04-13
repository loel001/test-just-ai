import React, {useCallback, useEffect, useState} from 'react';
import UserFavorite from "../user-favorite/user-favorite";
import {useSelector, useDispatch} from "react-redux";
import {useDrop} from 'react-dnd';
import {changeUsersFavorite} from '../../store/action';
import {getFavoritetUsers} from '../../common/utils';
import update from 'immutability-helper';

const UserFavoriteList = () => {
  const dispatch = useDispatch();
  const {users} = useSelector((state) => state.DATA);
  const [usersFavorite, setUsersFavorite] = useState(getFavoritetUsers(users));

  useEffect(() => {
    setUsersFavorite(getFavoritetUsers(users));
  }, [users]);

  const [{canDrop, isOver}, drop] = useDrop(() => ({
    accept: `User`,
    drop(item) {
      dispatch(changeUsersFavorite(item));
      return undefined;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [users]);
  const isActive = canDrop && isOver;
  let backgroundColor = `transporant`;
  if (isActive) {
    backgroundColor = `#ebeef5`;
  } else if (canDrop) {
    backgroundColor = `rgba(85, 104, 255, 0.15)`;
  }

  const moveUser = useCallback((dragIndex, hoverIndex) => {
    const dragUser = usersFavorite[dragIndex];
    setUsersFavorite(update(usersFavorite, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragUser],
      ],
    }));
  }, [usersFavorite]);
  const renderFavoriteUsers = (user, index) => {
    return (<UserFavorite key={user.indexSearch} user={user} moveUser={moveUser} index={index} id={user.indexSearch}/>);
  };

  return (
    <table ref={drop} className="main-page__users table-favorite">
      <thead>
        <tr className="table-favorite__title">
          <td>Избранные</td>
        </tr>
      </thead>
      <tbody className="table-favorite__container" style={{backgroundColor}}>
        {usersFavorite.map((user, index) => (
          renderFavoriteUsers(user, index)
        ))}
      </tbody>
    </table>
  );
};

export default UserFavoriteList;
