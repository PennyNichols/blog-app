import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { BlogContext } from '../contexts/BlogContext';


const Details = () => {
    const {state } = useLocation();
    const {id, author, body, imgUrl, title, userId} = state
    const {currentUser } = useContext(AuthContext);
    // const { blogs } = useContext(BlogContext);
    // const {id} = useParams()
    return (
        <div className='m-5 p-4' style={{ backgroundColor: "#d3d3d3e2" }}>
            <img className='mb-4' src={imgUrl} alt={title} />
            <h1 className='mb-4'>{title}</h1>
            <h2 className='mb-4'>Written by: {author ? author : 'Anonymous' }</h2>
            <p>{body}</p>
            { currentUser.uid === userId ? (
                <p>hello</p>
        
      ) : ( 
        <p>About the Author</p>
      )}
        </div>
  )
}

export default Details