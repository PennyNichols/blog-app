import { push, ref, remove, update } from "firebase/database";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";
import { db } from "../helpers/firebase";

const Likes = ({ blog }) => {
    const {likes, like, id} = blog
	const { currentUser } = useContext(AuthContext);

	const { handleLike } = useContext(BlogContext);

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
				onClick={() => handleLike(blog, likes, like, id)}
			/>
            <p className='mb-1'>{like}</p>
		</div>
	);
};

export default Likes;
