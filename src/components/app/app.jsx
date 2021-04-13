import React, {useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import UserCard from '../user-card/user-card';
import {AppRoute} from "../../common/const";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserList} from "../../store/api-actions";
import LoadingScreen from "../loading-screen/loading-screen";

const App = () => {
  const {isDataLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchUserList());
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.MAIN}
        render={() => <MainPage />}
      >
      </Route >
      <Route exact
        path={AppRoute.CARD}
        render={() => <UserCard />}
      >
      </Route>
      <Route
        render={() => <NotFoundPage />}
      >
      </Route>
    </Switch>
  );
};

export default App;
