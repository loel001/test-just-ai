import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from "../../common/const";
import Header from '../header/header';

const NotFoundPage = () => {

  return (
    <div>
      <Header />
      <main className="no-page">
        <section className="no-page__wrapper">
          <h1>404. Page not found</h1>
          <Link to={AppRoute.MAIN} className="no-page__link link-main">Вернуться на главную</Link>
        </section>
      </main>
    </div>
  );
};


export default NotFoundPage;
