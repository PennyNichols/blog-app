import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import defaultImg from "../assets/login-bg.jpg";

const BlogCard = (props) => {
	const { imgUrl, title, body, author, id, userId, date, headline } =
		props.blog;

	let { navigate } = useContext(AuthContext);
	const handleDetails = () => {
		navigate(`/details/${id}`, {
			state: { id, author, body, imgUrl, title, userId, headline },
		});
	};

	return (
		<div
			className="rounded shadow-lg  p-4"
			style={{
				width: "25rem",
				height: "28rem",
				backgroundColor: "#d3d3d3e2",
				cursor: "pointer",
			}}
			onClick={handleDetails}
		>
			<img
				classNames="shadow m-auto img-fluid"
				style={{ height: "10rem", borderRadius: "5px" }}
				src={imgUrl || defaultImg}
				alt={title}
			/>
			<div className="d-flex flex-column pt-2 justify-content-between" style={{ height: "16.2rem" }}>
				<div>
					<h3 className="my-2 mt-4 mx-auto fs-4">{title}</h3>
					<h4 className="my-2 mx-auto fs-5">{author}</h4>
				</div>
				<div className="my-1 mx-auto">{headline}</div>
				<div className="my-1">Last Edited: {date}</div>
			</div>
		</div>
	);
};

export default BlogCard;
