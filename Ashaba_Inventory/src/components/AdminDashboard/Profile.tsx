import React from 'react';
import { useProfile } from '../../ProfileContext'; // Correct import path

const Profile: React.FC = () => {
  const { name, email, phoneNumber, userType, section } = useProfile();

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
          LM
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">{userType}</p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <p><span className="font-bold">Email:</span> {email}</p>
        <p><span className="font-bold">Phone Number:</span> {phoneNumber}</p>
        <p><span className="font-bold">Section:</span> {section}</p>
      </div>
    </div>
  );
};

export default Profile;