import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { BlogContext } from "../contexts/BlogContext";

const Details = () => {
	const { state } = useLocation();
	const { id, author, body, imgUrl, title, userId } = state;
	const { currentUser, navigate } = useContext(AuthContext);
	// const { blogs } = useContext(BlogContext);
	// const {id} = useParams()
	return (
		<div className="m-5 p-4" style={{ backgroundColor: "#d3d3d3e2" }}>
			<img className="mb-4" src={imgUrl} alt={title} />
			<h1 className="mb-4">{title}</h1>
			<h2 className="mb-4">Written by: {author ? author : "Anonymous"}</h2>
			<p>{body}</p>
			{currentUser.uid === userId ? (
				<div className='d-flex gap-3 justify-content-center'>
					<button
						style={{ backgroundColor: "transparent", border: "none" }}
						type="button"
						onClick="handleEdit"
					>
						<FaEdit style={{ fontSize: "4rem", color: "green" }} />
					</button>
					<button
						style={{ backgroundColor: "transparent", border: "none" }}
						type="button"
						onClick="handleDelete"
					>
						<RiDeleteBinFill style={{ fontSize: "4rem", color: "red" }} />
					</button>
				</div>
			) : (
				<p>About the Author</p>
			)}
		</div>
	);
};

export default Details;
