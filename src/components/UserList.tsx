import type { User } from '../types';
import './UserList.css';

interface UserListProps {
  users: User[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const UserList = ({ users, onView, onEdit, onDelete }: UserListProps) => {
  return (
    <div className="user-list">
      {users.length === 0 ? (
        <p className="empty-message">No users registered</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td className="actions">
                  <button
                    className="btn btn-view"
                    onClick={() => onView(user.id)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
