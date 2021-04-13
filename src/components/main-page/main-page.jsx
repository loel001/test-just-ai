import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {sortUsers} from '../../common/utils';
import UserList from "../user-list/user-list";
import Header from '../header/header';
import UserFavoriteList from "../user-favorite-list/user-favorite-list";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

const MainPage = () => {
  const {users} = useSelector((state) => state.DATA);
  const [filter, setFilter] = useState(``);
  const usersCurrent = sortUsers(users);
  const maxUser = usersCurrent[usersCurrent.length - 1];

  const foo = (max) => {
    const arr = [];
    for (let i = 1; i < max; i = i + 10) {
      arr.push(i + `-` + (i + 9));
    }
    return arr;
  };

  const handleChange = (e) => {
    const {value} = e.target;
    setFilter(value);
  };

  return (
    <div>
      <Header/>
      <main className="main-page">
        <section className="main-page__wrapper">
          <DndProvider backend={HTML5Backend}>
            <section>
              <input className="main-page__search" type="text" value={filter} onChange={handleChange} placeholder="Поиск" />
              {foo(maxUser.registered.age).map((item, id) => {
                let nums = item.split(/\W/).filter((i) => parseInt(i) > -1).map(Number);
                const userAgeList = usersCurrent.filter((user) => user.registered.age >= nums[0] && user.registered.age <= nums[1]);
                return (
                  <UserList
                    key={item + id}
                    users={userAgeList}
                    item={item}
                    filter={filter}
                  />
                );
              })}
            </section>
            <section>
              <UserFavoriteList />
            </section>
          </DndProvider>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
