import React, { useContext } from 'react'
import ProfileCard from '../components/ProfileCard';
import ProfileForm from '../components/ProfileForm';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {


  return (
    <div className='d-flex justify-content-around p-5'>
        <ProfileForm/>
    </div>
  )
}

export default Profile