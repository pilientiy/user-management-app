import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, deleteUser, User } from './features/users/userSlice';
import { RootState, AppDispatch } from './store';
import './App.css';

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const [nameFilter, setNameFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [phoneFilter, setPhoneFilter] = useState('');

  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    username: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user: User) =>
    user.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    user.username.toLowerCase().includes(usernameFilter.toLowerCase()) &&
    user.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
    user.phone.toLowerCase().includes(phoneFilter.toLowerCase())
  );

  const handleAddUser = () => {
    dispatch(addUser(newUser));
    setNewUser({ name: '', username: '', email: '', phone: '' }); // Clear form
  };

  const handleDeleteUser = (userId: number) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="App">
      <h1>User Management Table</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by username"
          value={usernameFilter}
          onChange={(e) => setUsernameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by phone"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
        />
      </div>

      <div className="add-user">
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
