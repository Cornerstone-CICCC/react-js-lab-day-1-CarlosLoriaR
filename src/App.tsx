import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import type { User, UserFormData } from './types';
import './App.css';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<UserFormData>({
    fullname: '',
    age: 0,
    education: '',
    gender: '',
    skills: [],
    bio: '',
  });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        skills: checkbox.checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value,
      }));
    }
  };

  const handleAddOrSaveUser = () => {
    if (!formData.fullname.trim()) {
      alert('Please enter a name');
      return;
    }

    if (editingId !== null) {
      // Update existing user
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingId ? { ...user, ...formData } : user
        )
      );
      setEditingId(null);
    } else {
      // Add new user
      const newUser: User = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      };
      setUsers((prev) => [...prev, newUser]);
    }

    handleClearForm();
  };

  const handleClearForm = () => {
    setFormData({
      fullname: '',
      age: 0,
      education: '',
      gender: '',
      skills: [],
      bio: '',
    });
    setEditingId(null);
  };

  const handleViewUser = (id: number) => {
    setSelectedUserId(id);
  };

  const handleEditUser = (id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      const { id: _, ...userData } = user;
      setFormData(userData);
      setEditingId(id);
      setSelectedUserId(null);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      if (selectedUserId === id) {
        setSelectedUserId(null);
      }
    }
  };

  return (
    <div className="app">
      <h1>User Management</h1>
      <div className="container">
        <div className="form-section">
          <h2>{editingId !== null ? 'Edit User' : 'Add User'}</h2>
          <UserForm
            formData={formData}
            onFormChange={handleFormChange}
            onAddOrSave={handleAddOrSaveUser}
            onClear={handleClearForm}
            isEditing={editingId !== null}
          />
        </div>

        <div className="list-section">
          <h2>User List</h2>
          <UserList
            users={users}
            onView={handleViewUser}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </div>

        <div className="profile-section">
          <h2>User Profile</h2>
          {selectedUserId ? (
            <UserProfile user={users.find((u) => u.id === selectedUserId)} />
          ) : (
            <p>Select a user to view their profile</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
