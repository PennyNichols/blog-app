import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { BlogContext } from "../contexts/BlogContext";
import defaultImg from '../assets/login-bg.jpg'

const Details = () => {
	const { state } = useLocation();
	const { id, author, body, imgUrl, title, userId } = state;
	const { currentUser, navigate } = useContext(AuthContext);
	const {
		setTitle,
		setImgUrl,
		setBody,
		writeToDatabase,
		blogs,
		deleteBlog,
		updateBlog,
		edit,
		setEdit,
		setUpdateId,
	} = useContext(BlogContext);
	// const { blogs } = useContext(BlogContext);
	// const {id} = useParams()

	const handleUpdate = () => {
		setTitle(title);
		setImgUrl(imgUrl);
		setBody(body);
		setUpdateId(id);
		setEdit(true);
		navigate("/new-blog");
	};

	return (
		<div className="m-5 p-4 rounded shadow-lg" style={{ backgroundColor: "#d3d3d3e2" }}>
			<img className="mb-4 rounded shadow" style={{height:'18rem'}} src={imgUrl || defaultImg} alt={title} />
			<h1 className="mb-4">{title}</h1>
			<h2 className="mb-4">Written by: {author ? author : "Anonymous"}</h2>
			<p>{body}</p>
			{currentUser.uid === userId ? (
				<>
					<div className="d-flex gap-3 justify-content-center">
						<button
							style={{ backgroundColor: "transparent", border: "none" }}
							type="button"
							onClick={handleUpdate}
						>
							<FaEdit style={{ fontSize: "3rem", color: "green" }} />
						</button>
						<button
							style={{ backgroundColor: "transparent", border: "none" }}
							type="button"
							onClick={() => deleteBlog(id)}
						>
							<RiDeleteBinFill style={{ fontSize: "3rem", color: "red" }} />
						</button>
					</div>
                        <Link style={{textDecoration:'none', textTransform:'uppercase'}} to="/about"><h4 className='mt-3' >About our authors</h4></Link>
				</>
			) : (
				<Link style={{textDecoration:'none', textTransform:'uppercase'}} to="/about"><h4 className='mt-3' >meet the author</h4></Link>
			)}
		</div>
	);
};

export default Details;
