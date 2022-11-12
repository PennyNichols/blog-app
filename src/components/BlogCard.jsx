import React from 'react'
import { Card } from 'react-bootstrap'

const BlogCard = (props) => {
    console.log(props.blog)
    const {imgUrl, title, body, author} = props.blog
  return (
    <div className='rounded shadow my-2 p-2' style={{ width: '25rem', backgroundColor: "#d3d3d3e2"  }}>
        <img classNames="d-block m-auto"  style={{width: '10rem'}} src={imgUrl} alt={title} />
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{author}</Card.Subtitle>
            <Card.Text>
                {body.substring(0,150)}...
            </Card.Text>
        </Card.Body>
        
    </div>
  )
}

export default BlogCard