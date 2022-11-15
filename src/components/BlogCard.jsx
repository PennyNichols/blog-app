import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import defaultImg from '../assets/login-bg.jpg'

const BlogCard = (props) => {
	const { imgUrl, title, body, author, id, userId, date } = props.blog;

    let { navigate } = useContext(AuthContext);
    const handleDetails = () => {
        navigate(`/details/${id}`, {state: {id, author, body, imgUrl, title, userId}})
        
    }



	return (
		<div
			className="rounded shadow-lg  p-4"
			style={{ width: "25rem", height:'30rem', backgroundColor: "#d3d3d3e2", cursor:'pointer' }}
			onClick={handleDetails}
		>
			<img
				classNames="shadow m-auto img-fluid"
				style={{ height: "10rem", borderRadius:'5px' }}
				src={imgUrl || defaultImg}
				alt={title}
			/>
			<div className='d-flex flex-column align-items-start ' style={{height:'18rem'}}>
				<div className='my-2 mx-auto fs-4'>{title}</div>
				<div className='my-2 mx-auto fs-5'>{author}</div>
				<div className='my-1 mx-auto'>{body.substring(0, 150)}...</div>
				<div className='mt-auto d-flex flex-column'>Last Edited: {date}</div>
			</div>
		</div>
	);
};

export default BlogCard;
