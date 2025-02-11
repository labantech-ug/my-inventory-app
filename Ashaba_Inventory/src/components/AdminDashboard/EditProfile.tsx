import React, { useState } from 'react';
import { useProfile } from '../../ProfileContext'; // Correct import path

interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
  userType: string;
  section: string;
  setProfile: (profile: { name: string; email: string; phoneNumber: string; userType: string; section: string }) => void;
}

const EditProfile: React.FC = () => {
  const { name: initialName, email: initialEmail, phoneNumber: initialPhoneNumber, userType: initialUserType, section: initialSection, setProfile }: UserProfile = useProfile();
  const [name, setName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);
  const [userType, setUserType] = useState<string>(initialUserType);
  const [section, setSection] = useState<string>(initialSection);

  const handleUpdateProfile = () => {
    setProfile({ name, email, phoneNumber, userType, section });
    console.log(`Updating profile with Name: ${name}, Email: ${email}, Phone Number: ${phoneNumber}, User Type: ${userType}, Section: ${section}`);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-bold mb-1">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-bold mb-1">Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-bold mb-1">User Type:</label>
          <input type="text" value={userType} onChange={(e) => setUserType(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div>
          <label className="block font-bold mb-1">Section:</label>
          <input type="text" value={section} onChange={(e) => setSection(e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
        </div>
      </div>
      <button type="button" onClick={handleUpdateProfile} className="mt-4 bg-blue-600 text-white p-2 rounded">Update Profile</button>
    </div>
  );
};

export default EditProfile;