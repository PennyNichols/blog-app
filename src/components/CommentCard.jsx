import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";
import { CommentContext } from "../contexts/CommentContext";
import { ProfileContext } from "../contexts/ProfileContext";

const CommentCard = (props) => {
	const { author, comment, date, userId, id } = props.comment;

	let { currentUser, navigate } = useContext(AuthContext);
	let { profiles } = useContext(ProfileContext);
	let { deleteComment, setCommentText, setEdit, setUpdateId, updateId } =
		useContext(CommentContext);

	// style={{
	//     color: comments?.includes(comments.blogId===id) ? "black" : null,
	// }}

	const handleUpdateComment = () => {
		setCommentText(comment);
		setUpdateId(id);
		setEdit(true);
	};

	const posterProfile = profiles.filter((profile) => profile.userId === userId);
	const imgUrl = posterProfile[0].imgUrl;

	// likes.filter(user => user !== currentUser.uid)

	return (
		<div className="comment-wrapper d-flex justify-content-between align-items-center border p-3 my-4">
			<div className='comment-img-wrapper d-flex align-items-center'>
				<img style={{height: '8rem'}} src={imgUrl} alt={author} />
				<div>
					<h4
						style={{ color: currentUser.uid === userId ? "#0d6efd" : "black" }}
					>
						{author}
					</h4>
					<p>Posted: {date}</p>
				</div>
			</div>
			<div>
				<p className='comment m-4'>{comment}</p>
			</div>
			<div className="d-flex gap-3 justify-content-center">
				<button
					style={{ backgroundColor: "transparent", border: "none" }}
					type="button"
					onClick={handleUpdateComment}
				>
					<FaEdit style={{ fontSize: "2rem", color: "green" }} />
				</button>
				<button
					style={{ backgroundColor: "transparent", border: "none" }}
					type="button"
					onClick={() => deleteComment(id)}
				>
					<RiDeleteBinFill style={{ fontSize: "2rem", color: "red" }} />
				</button>
			</div>
		</div>
	);
};

export default CommentCard;
