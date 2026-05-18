import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './components/utils/supabase';
import Footer from './components/Footer';

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');

  async function getUsers() {
    const { data } = await supabase.from('users').select('*');
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function addUser(userName) {
    if (!userName) return;

    const { data, error } = await supabase
      .from('users')
      .insert([{ user_name: userName }]);

    if (error) {
      console.error(error);
      return;
    }

    setUserName('');
    getUsers();
  }

  return (
    <>
    <h1>Users Names</h1>

    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const userName = formData.get('user_name');
      addUser(userName);
    }}>
      <input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        type="text"
        name="user_name"
        placeholder="Enter user name" />

      <button type="submit">Add User</button>
    </form>
      {users.map((u) => {
       return <p key={u.id}>{u.user_email}</p>;
})}
      <Footer />
    </>
  )
}

export default App    