import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { BlogContext } from "../contexts/BlogContext";
import defaultImg from "../assets/login-bg.jpg";
import htmlToDraft from "html-to-draftjs";
import { ContentState, EditorState } from "draft-js";
import { Button, Container, Form } from "react-bootstrap";
import Likes from "../components/Likes";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";
import { CommentContext } from "../contexts/CommentContext";
import { ref, update } from "firebase/database";
import { db } from "../helpers/firebase";

const Details = () => {
	const { state } = useLocation();
	const {
		id,
		author,
		body,
		imgUrl,
		title,
		userId,
		headline,
		likes,
		like,
		date,
		
	} = state;
	const { currentUser, navigate } = useContext(AuthContext);
	const { comments } = useContext(CommentContext);
	const {
		setTitle,
		setImgUrl,
		setBody,
		deleteBlog,
		setEdit,
		setUpdateId,
		setHeadline,
		setEditorState,
	} = useContext(BlogContext);
	// const { blogs } = useContext(BlogContext);
	// const {id} = useParams()


	const commentArr = comments.filter(comment => comment.blogId === id)
	const commentCount = commentArr.length


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

	const handleLike = (state) => {
		if (!Object.values(likes).includes(currentUser.uid)) {
			update(ref(db, "Blog/" + id), {
				...state,
				like: +like + 1,
				likes: [...likes, currentUser.uid],
			});
			console.log("liked");
		} else {
			update(ref(db, "Blog/" + id), {
				...state,
				like: +like - 1,
				likes: likes.filter((user) => user !== currentUser.uid),
			});
			console.log("unliked");
		}
	};

	return (
		<>
			<Container
				fluid
				className=" details-wrapper m-5 mx-auto p-4 pb-1 rounded shadow-lg"
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
				<div
					className="blog-body m-5"
					dangerouslySetInnerHTML={{
						__html: body,
					}}
				/>
				{currentUser.uid === userId ? (
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
				) : (
					<Link
						style={{ textDecoration: "none", textTransform: "uppercase" }}
						to="/about"
					>
						<h4 className="mt-3">meet the author</h4>
					</Link>
				)}
				<div className="d-flex justify-content-between">
					<div className="my-1">Last Edited: {date}</div>
					{currentUser && (
						<>
							<div className="my-1">Last Edited: {date}</div>

							<div className="d-flex gap-2 justify-content-center align-items-center">
								<i
									className={`fa fa-heart${
										!likes?.includes(currentUser.uid) ? "-o" : ""
									} fa-lg`}
									style={{
										cursor: "pointer",
										color: likes?.includes(currentUser.uid) ? "red" : null,
									}}
									onClick={() => handleLike(state)}
								/>
								<p className="mb-1">{like}</p>
								<i
									className={`fa fa-comment${
										commentCount === 0 ? "-o" : ""
									} fa-lg`}
									style={{
										color: commentCount >= 1 ? "black" : null,
									}}
								/>
								<p className="mb-1">{commentCount}</p>
							</div>
						</>
					)}
				</div>
			</Container>
			<Container
				fluid
				className=" details-wrapper m-5 mx-auto p-4 pb-1 rounded shadow-lg"
				style={{ backgroundColor: "#d3d3d3e2" }}
			>
				<h2>Comments</h2>
				<CommentForm id={id} blog={state} />
				{comments
					?.filter((comment) => comment.blogId === id)
					.map((filteredComment) => {
						return (
							<CommentCard key={filteredComment.id} comment={filteredComment} />
						);
					})}
			</Container>
		</>
	);
};

export default Details;
