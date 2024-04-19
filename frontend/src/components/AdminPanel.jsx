import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";


const AdminPanel = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAddress, setFilterAddress] = useState("");

  

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("https://bynry-case-study-frontend.onrender.com/api/profiles", {
        params: {
          name: searchQuery,
          address: filterAddress,
        },
      });
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };
  useEffect(() => {
    fetchProfiles();
  }, [searchQuery, filterAddress]);

  const handleAddProfile = async (formData) => {
    try {
      await axios.post("https://bynry-case-study-frontend.onrender.com/api/profiles", formData);
      fetchProfiles();
      setShowProfileForm(false);
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const handleEditProfile = async (editedProfile) => {
    try {
      await axios.put(
        `https://bynry-case-study-frontend.onrender.com/api/profiles/${editedProfile._id}`,
        editedProfile
      );
      fetchProfiles();
      setSelectedProfile(null);
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    try {
      await axios.delete(`https://bynry-case-study-frontend.onrender.com/api/profiles/${profileId}`);
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setShowProfileForm(true);
  };

  const handleCancelEdit = () => {
    setSelectedProfile(null);
    setShowProfileForm(false);
  };
 

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-4">
        Profile Management
      </h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 absolute top-0 left-0 m-4"
        onClick={() => setShowProfileForm(!showProfileForm)}
      >
        {showProfileForm ? "Hide Profile Form" : "Admin Panel"}
      </button>
      {showProfileForm && (
        <ProfileForm
          onAddProfile={handleAddProfile}
          onEditProfile={handleEditProfile}
          selectedProfile={selectedProfile}
          onCancelEdit={handleCancelEdit}
        />
      )}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 mr-4"
        />
        <input
          type="text"
          placeholder="Filter by Location"
          value={filterAddress}
          onChange={(e) => setFilterAddress(e.target.value)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            onEdit={handleEdit}
            onDelete={handleDeleteProfile}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
