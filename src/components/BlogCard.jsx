import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import defaultImg from "../assets/login-bg.jpg";
import Likes from "./Likes";

const BlogCard = (props) => {
    const { imgUrl, title, body, author, id, userId, date, headline, likes, like } =
    props.blog;
	let { navigate, currentUser } = useContext(AuthContext);
	const handleDetails = () => {
        navigate(`/details/${id}`, {
            state: { id, author, body, imgUrl, title, userId, headline, likes, like, date },
		});
	};
    
	return (
		<div
			className="rounded shadow-lg  p-4"
			style={{
				width: "25rem",
				height: "28rem",
				backgroundColor: "#d3d3d3e2",
			}}
		>
			<div
				classNames="link-to-details"
				onClick={handleDetails}
				style={{ cursor: "pointer" }}
			>
				<img
					classNames="shadow m-auto img-fluid"
					style={{ height: "10rem", borderRadius: "5px" }}
					src={imgUrl || defaultImg}
					alt={title}
				/>
				<div
					className="d-flex flex-column pt-2 justify-content-start"
					style={{ height: "14em" }}
				>
					<h3 className="my-2 mt-4 mx-auto fs-4">{title}</h3>
					<h4 className="my-2 mx-auto fs-5">{author}</h4>
					<div className="my-3 mx-auto">{headline}</div>
				</div>
			</div>
			<div className="d-flex justify-content-between">
				<div className="my-1">Last Edited: {date}</div>
				{currentUser && <Likes id={id} blog={props.blog} likes={likes} like={like} />}
			</div>
		</div>
	);
};

export default BlogCard;
