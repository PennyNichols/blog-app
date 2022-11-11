import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
    const {currentUser } = useContext(AuthContext);

    console.log(currentUser.uid)
  return (
    <div>Profile</div>
  )
}

export default Profile