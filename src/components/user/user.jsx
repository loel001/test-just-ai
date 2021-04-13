import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import BacklightLetters from '../backlight-letters/backlight-letters';
import {Link} from 'react-router-dom';
import {useDrag} from 'react-dnd';

const User = ({user, filter}) => {
  const light = useCallback((str) => {
    return <BacklightLetters filter={filter} str={str} />;
  }, [filter]);

  const [{isDragging}, drag] = useDrag(() => ({
    type: `User`,
    item: user,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [user.indexSearch]);
  if (isDragging) {
    return <tr ref={drag}/>;
  }

  return (
    <tr ref={drag} role="User">
      <td>
        <Link to={`/user/` + user.indexSearch}>
          {light(user.name.first)} {light(user.name.last)}
        </Link>
      </td>
    </tr>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
  filter: PropTypes.any
};

export default User;
