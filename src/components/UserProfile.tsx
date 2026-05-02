import type { User } from '../types';
import './UserProfile.css';

interface UserProfileProps {
  user?: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  if (!user) {
    return <p className="no-user">Select a user to view their profile</p>;
  }

  return (
    <div className="user-profile">
      <div className="profile-field">
        <label>ID:</label>
        <p>{user.id}</p>
      </div>

      <div className="profile-field">
        <label>Full Name:</label>
        <p>{user.fullname}</p>
      </div>

      <div className="profile-field">
        <label>Age:</label>
        <p>{user.age}</p>
      </div>

      <div className="profile-field">
        <label>Education:</label>
        <p>{user.education}</p>
      </div>

      <div className="profile-field">
        <label>Gender:</label>
        <p>{user.gender}</p>
      </div>

      <div className="profile-field">
        <label>Skills:</label>
        <p>{user.skills.length > 0 ? user.skills.join(', ') : 'No skills'}</p>
      </div>

      <div className="profile-field">
        <label>Bio:</label>
        <p>{user.bio || 'No information'}</p>
      </div>
    </div>
  );
};

export default UserProfile;
