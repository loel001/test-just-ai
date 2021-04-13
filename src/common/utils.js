export const sortUsers = (users) => {
  return [...users].sort((a, b) => (a.registered.age - b.registered.age));
};

export const addIsFavorite = (users) => {
  return users.map((user, index) => ({
    ...user,
    isFavorite: false,
    indexSearch: index + 1
  }));
};

export const getFavoritetUsers = (users) => {
  return users.filter((user) => user.isFavorite === true);
};

export const getNotFavoritetUsers = (users) => {
  return users.filter((user) => user.isFavorite === false);
};

export const updatePlaces = (users, updatedUser, isFavoriteItem) => {
  const offerIndex = users.findIndex((user) => user.indexSearch === updatedUser.indexSearch);

  return [...users.slice(0, offerIndex),
    Object.assign({}, updatedUser, {isFavorite: isFavoriteItem}),
    ...users.slice(offerIndex + 1)];
};

export const changeFavoriteUsers = (users, updatedUser) => {
  return updatedUser.isFavorite ? updatePlaces(users, updatedUser, false) : updatePlaces(users, updatedUser, true);
};
