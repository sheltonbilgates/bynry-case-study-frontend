import React, { useState, useEffect } from 'react';

const ProfileForm = ({ onAddProfile, onEditProfile, selectedProfile, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
    address: ''
  });

  useEffect(() => {
    if (selectedProfile) {
      setFormData({
        name: selectedProfile.name,
        photo: selectedProfile.photo,
        description: selectedProfile.description,
        address: selectedProfile.address
      });
    }
  }, [selectedProfile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedProfile) {
      await onEditProfile({ ...selectedProfile, ...formData });
    } else {
      await onAddProfile(formData);
    }
    setFormData({ name: '', photo: '', description: '', address: '' });
  };

  const handleCancel = () => {
    onCancelEdit();
    setFormData({ name: '', photo: '', description: '', address: '' });
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{selectedProfile ? 'Edit Profile' : 'Add Profile'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
    
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          placeholder="Photo URL"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
          rows="4"
        ></textarea>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />

  
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {selectedProfile ? 'Save' : 'Add'}
        </button>
        {selectedProfile && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default ProfileForm;
