import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

const BlogCard = (props) => {
	const { imgUrl, title, body, author, id } = props.blog;
    let { navigate } = useContext(AuthContext);
    const postId = JSON.stringify(id)

	return (
		<div
			className="rounded shadow  p-2"
			style={{ width: "25rem", backgroundColor: "#d3d3d3e2", cursor:'pointer' }}
			onClick={(id) => navigate(`/details/${postId}`)}
		>
			<img
				classNames="d-block m-auto"
				style={{ width: "10rem" }}
				src={imgUrl}
				alt={title}
			/>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Subtitle>{author}</Card.Subtitle>
				<Card.Text>{body.substring(0, 150)}...</Card.Text>
			</Card.Body>
		</div>
	);
};

export default BlogCard;
