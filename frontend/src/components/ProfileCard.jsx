import React, { useState } from 'react';
import MapComponent from './MapComponent';

const ProfileCard = ({ profile, onEdit, onDelete }) => {
  const [showMap, setShowMap] = useState(false);

  const handleShowMap = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <img src={profile.photo} alt={profile.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
      <h2 className="text-lg font-semibold">{profile.name}</h2>
      <p className="text-sm text-gray-500 mb-2">{profile.description}</p>
      <button onClick={handleShowMap} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
        Summary
      </button>
      <button onClick={() => onEdit(profile)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
        Edit
      </button>
      <button onClick={() => onDelete(profile._id)} className="bg-red-500 text-white px-3 py-1 rounded">
        Delete
      </button>

      {showMap && (
        <div className="mt-4">
          <MapComponent address={profile.address} onClose={handleCloseMap} />
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
