import { createContext } from 'react';

const UserContext = createContext({
  user: 'Guest',
  isAdmin: false
});

export default UserContext;
