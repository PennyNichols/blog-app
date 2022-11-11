import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';

const Profile = () => {
    const {userId, currentUser, name } = useContext(AuthContext);

    console.log(currentUser.displayName)

  return (
    <div>Profile</div>
  )
}

export default Profile