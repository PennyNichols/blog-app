import React, { useContext } from 'react'
import ProfileCard from '../components/ProfileCard';
import ProfileForm from '../components/ProfileForm';
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
    const {userId, currentUser, name } = useContext(AuthContext);

    console.log(currentUser.displayName)

  return (
    <div className='d-flex justify-content-around'>
        <ProfileForm/>
        <ProfileCard/>
    </div>
  )
}

export default Profile