import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";
import { CommentContext } from "../contexts/CommentContext";

const Likes = ({ blog }) => {
    const {likes, like, id} = blog
	const { currentUser } = useContext(AuthContext);

	const { handleLike } = useContext(BlogContext);
	
	const { comments } = useContext(CommentContext);

	const commentArr = comments.filter(comment => comment.blogId === id)
	const commentCount = commentArr.length
	

	return (
		<div className='d-flex gap-2 justify-content-center align-items-center'>
			<i
				className={`fa fa-heart${
					!likes?.includes(currentUser.uid) ? "-o" : ""
				} fa-lg`}
				style={{
					cursor: "pointer",
					color: likes?.includes(currentUser.uid) ? "red" : null,
				}}
				onClick={() => handleLike(blog)}
			/>
            <p className='mb-1'>{like}</p>
			<i
				className={`fa fa-comment${
					(commentCount===0) ? "-o" : ""
				} fa-lg`}
				style={{
					color: (commentCount>=1) ? "black" : null,
				}}
			/>
            <p className='mb-1'>{commentCount}</p>
			
		</div>
	);
};

export default Likes;
