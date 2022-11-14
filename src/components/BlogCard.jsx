import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import defaultImg from '../assets/login-bg.jpg'

const BlogCard = (props) => {
	const { imgUrl, title, body, author, id, userId } = props.blog;

    let { navigate } = useContext(AuthContext);
    const handleDetails = () => {
        navigate(`/details/${id}`, {state: {id, author, body, imgUrl, title, userId}})
        
    }



	return (
		<div
			className="rounded shadow-lg  p-2"
			style={{ width: "25rem", backgroundColor: "#d3d3d3e2", cursor:'pointer' }}
			onClick={handleDetails}
		>
			<img
				classNames="d-block m-auto"
				style={{ width: "10rem" }}
				src={imgUrl || defaultImg}
				alt={title}
			/>
			<Card.Body>
				<Card.Title className='my-2'>{title}</Card.Title>
				<Card.Subtitle className='my-2'>{author}</Card.Subtitle>
				<Card.Text className='my-2'>{body.substring(0, 150)}...</Card.Text>
			</Card.Body>
		</div>
	);
};

export default BlogCard;
