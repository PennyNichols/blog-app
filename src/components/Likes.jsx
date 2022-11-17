import { push, ref, remove, update } from "firebase/database";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BlogContext } from "../contexts/BlogContext";
import { db } from "../helpers/firebase";

const Likes = ({ blog }) => {
    const {likes} = blog
	const { currentUser } = useContext(AuthContext);

	const { handleLike } = useContext(BlogContext);

	return (
		<div>
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
		</div>
	);
};

export default Likes;
