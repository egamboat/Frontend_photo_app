"use client";
import { useState, useEffect } from 'react';

const fetchProfile = async (token: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/usuario/profile/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.error || 'Something went wrong'}`);
    }

    const data = await response.text(); // La API devuelve un mensaje como texto
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

const Profile = () => {
  const [profile, setProfile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const profileData = await fetchProfile(token);
        setProfile(profileData);
        setError(null);
      } catch (error) {
        console.log(error)
        setProfile(null);
      }
    };
    loadProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {error && <p>Error: {error}</p>}
      {profile && <p>{profile}</p>}
    </div>
  );
};

export default Profile;
