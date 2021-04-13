import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useRouteMatch} from 'react-router-dom';
import Moment from 'react-moment';
import Header from "../header/header";
import NotFoundPage from "../not-found-page/not-found-page";
import {changeUsersFavorite} from "../../store/action";
import {AppRoute} from "../../common/const";

const UserCard = () => {
  const {users} = useSelector((state) => state.DATA);

  const match = useRouteMatch();
  const pathId = match.params.id;
  const currentUser = users.filter((user) => user.indexSearch === Number(pathId));
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeUsersFavorite(currentUser[0]));
  };

  return (
    currentUser.length !== 0 ?
      <div>
        <Header />
        <main className="main-page">
          <div className="main-page__wrapper">
            <table className="main-page__table user-table">
              <tbody>
                <tr>
                  <td rowSpan="2" className="user-table__image">
                    <img src={currentUser[0].picture.medium} alt="Фото пользователя"/>
                  </td>
                  <td>
                    {currentUser[0].name.first} {currentUser[0].name.last}, дата регистрации: <Moment format="DD.MM.YYYY">{currentUser[0].registered.date}</Moment>
                  </td>
                  {currentUser[0].isFavorite &&
                    <td rowSpan="2" className="user-table__button">
                      <button type="button" aria-label="Удалить из избранных" onClick={handleClick}>
                        <svg width="24" height="24">
                          <use xlinkHref="#icon-delete"></use>
                        </svg>
                      </button>
                    </td>
                  }
                </tr>
                <tr>
                  <td>
                    {currentUser[0].email}
                  </td>
                </tr>
              </tbody>
            </table>
            <Link to={AppRoute.MAIN} className="main-page__link link-main">Вернуться на главную</Link>
          </div>
        </main>
      </div>
      :
      <NotFoundPage />
  );
};

export default UserCard;
