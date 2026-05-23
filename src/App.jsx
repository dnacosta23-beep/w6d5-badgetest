import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './components/utils/supabase';

function App() {
  const [users, setUsers] = useState([])
  const [userName, setUserName] = useState('')

async function getUsers() {
const {data} = await supabase.from('users').select('*');
 
setUsers(data);
}

useEffect (() => {
  getUsers()}, []);

  

  return (
    <>
      <h1>Users Names</h1>

    <form onSubmit = {async (e) => {
      e.preventDefault();
      const {data} = await supabase
      .from('users')
      .insert([{user_name: userName}]);

      setUserName('');
      getUsers();
    }}>

    <input value={userName}
  onChange={(e) => setUserName(e.target.value)}
  type="text"
  name="user_name"
  placeholder="name" />

    <button type="submit">ADD USER</button>

    </form>

    {users.map (u => (<p key = {u.id}>{u.user_name}</p>)
    
    )}


    </>
  )
}

export default App  
