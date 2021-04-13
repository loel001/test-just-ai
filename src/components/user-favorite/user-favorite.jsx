import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useDrag, useDrop} from 'react-dnd';

const UserFavorite = ({user, moveUser, index, id}) => {
  const ref = useRef(null);
  const [{handlerId}, drop] = useDrop({
    accept: `UserFavoriteCard`,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveUser(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{isDragging}, drag] = useDrag({
    type: `UserFavoriteCard`,
    item: () => {
      return {id, index};
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <tr ref={ref} style={{opacity}} data-handler-id={handlerId} role="UserFavoriteCard">
      <td>
        <Link to={`/user/` + user.indexSearch}>
          {user.name.first} {user.name.last}
        </Link>
      </td>
    </tr>
  );
};

UserFavorite.propTypes = {
  user: PropTypes.object.isRequired,
  filter: PropTypes.any
};

export default UserFavorite;
