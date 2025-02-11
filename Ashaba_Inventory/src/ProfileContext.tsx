import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProfileContextProps {
  name: string;
  email: string;
  phoneNumber: string;
  userType: string;
  section: string;
  setProfile: (profile: Omit<ProfileContextProps, 'setProfile'>) => void;
}

const initialProfile = {
  name: 'Laban MUGISHA',
  email: 'mlaban1995@gmail.com',
  phoneNumber: 'NOT PROVIDED',
  userType: 'Admin',
  section: 'University ICT Services',
  setProfile: () => {},
};

const ProfileContext = createContext<ProfileContextProps>(initialProfile);

export const useProfile = () => useContext(ProfileContext);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <ProfileContext.Provider value={{ ...profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};