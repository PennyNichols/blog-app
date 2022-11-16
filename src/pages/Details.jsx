import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { BlogContext } from "../contexts/BlogContext";
import defaultImg from "../assets/login-bg.jpg";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState } from "draft-js";
import { Container } from "react-bootstrap";

const Details = () => {
	const { state } = useLocation();
	const { id, author, body, imgUrl, title, userId, headline } = state;
	const { currentUser, navigate } = useContext(AuthContext);
	const {
		setTitle,
		setImgUrl,
		setBody,
		deleteBlog,
		setEdit,
		setUpdateId,
		setHeadline,
        setEditorState
	} = useContext(BlogContext);
	// const { blogs } = useContext(BlogContext);
	// const {id} = useParams()

	const handleUpdate = () => {
		setTitle(title);
		setHeadline(headline);
		setImgUrl(imgUrl);
		setBody(body);
		setUpdateId(id);
		const contentBlock = htmlToDraft(body);
		const contentState = ContentState.createFromBlockArray(
			contentBlock.contentBlocks
		);
		const _editorState = EditorState.createWithContent(contentState);
		setEditorState(_editorState);
		setEdit(true);
		navigate("/new-blog");
	};

	return (
		<Container
            fluid
			className=" details-wrapper m-5 mx-auto p-4 rounded shadow-lg"
			style={{ backgroundColor: "#d3d3d3e2" }}
		>
			<img
				className="mb-4 rounded shadow"
				style={{ height: "18rem" }}
				src={imgUrl || defaultImg}
				alt={title}
			/>
			<h1 className="mb-4">{title}</h1>
			<h2 className="mb-4">{headline}</h2>
			<h3 className="mb-4">Written by: {author ? author : "Anonymous"}</h3>
			<div className='blog-body m-5'
				dangerouslySetInnerHTML={{
					__html: body,
				}}
			/>
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
					<Link
						style={{ textDecoration: "none", textTransform: "uppercase" }}
						to="/about"
					>
						<h4 className="mt-3">About our authors</h4>
					</Link>
				</>
			) : (
				<Link
					style={{ textDecoration: "none", textTransform: "uppercase" }}
					to="/about"
				>
					<h4 className="mt-3">meet the author</h4>
				</Link>
			)}
		</Container>
	);
};

export default Details;
