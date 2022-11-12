import React, { useContext } from 'react'
import { BlogContext } from '../contexts/BlogContext';

const Dashboard = () => {
    const {blogs } = useContext(BlogContext);
    console.log(blogs)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard