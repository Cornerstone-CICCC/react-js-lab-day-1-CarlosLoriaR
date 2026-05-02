import type { UserFormData } from '../types';
import './UserForm.css';

interface UserFormProps {
  formData: UserFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onAddOrSave: () => void;
  onClear: () => void;
  isEditing: boolean;
}

const UserForm = ({
  formData,
  onFormChange,
  onAddOrSave,
  onClear,
  isEditing,
}: UserFormProps) => {
  return (
    <form className="user-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-group">
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={onFormChange}
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={onFormChange}
          min="0"
        />
      </div>

      <div className="form-group">
        <label htmlFor="education">Education</label>
        <select
          id="education"
          name="education"
          value={formData.education}
          onChange={onFormChange}
        >
          <option value="">Select an option</option>
          <option value="Grade school">Grade school</option>
          <option value="High school">High school</option>
          <option value="College">College</option>
        </select>
      </div>

      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={onFormChange}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={onFormChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              checked={formData.gender === 'Other'}
              onChange={onFormChange}
            />
            <label htmlFor="other">Other</label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Skills</label>
        <div className="checkbox-group">
          {['TypeScript', 'React', 'Node', 'NoSQL'].map((skill) => (
            <div key={skill}>
              <input
                type="checkbox"
                id={skill}
                name="skills"
                value={skill}
                checked={formData.skills.includes(skill)}
                onChange={onFormChange}
              />
              <label htmlFor={skill}>{skill}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={onFormChange}
          placeholder="Tell us about yourself"
          rows={4}
        />
      </div>

      <div className="button-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAddOrSave}
        >
          {isEditing ? 'Save User' : 'Add/Save User'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default UserForm;
