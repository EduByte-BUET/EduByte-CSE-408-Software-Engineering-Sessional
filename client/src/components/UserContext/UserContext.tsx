import React, { Dispatch, SetStateAction } from 'react';

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: (() => {}) as Dispatch<SetStateAction<any>>,
});