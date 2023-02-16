import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './components/login.form';
import {Context} from './index';
import { IUser } from './models/response/IUser';
import { UserService } from './services/user.service';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  if(store.isLoading) {
    return <div>Loading...</div>
  }

  if(!store.user.id) {
    return (
      <LoginForm />
    )
  }

  return (
    <div >
      <h1>{store.user.id ? `User authorized as ${store.user.email}` : `User unauthorized`}</h1>
      <button onClick={() => store.logout()}>Log Out</button>
      <div>
        <button onClick={getUsers}>User list</button>
        <div>{users.map(user => {
          return (<div key={user.email}>{user.email}</div>) 
        })}</div>
      </div>
    </div>
  );
}

export default observer(App);
