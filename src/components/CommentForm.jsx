import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { CommentContext } from "../contexts/CommentContext";

const CommentForm = ({ blog }) => {
	const { commentText, setCommentText, handleComment, setBlogId, edit } =
		useContext(CommentContext);

	setBlogId(blog.id);
	return (
		<Form className="d-flex gap-3 my-4" onSubmit={handleComment}>
			<Form.Control
				required
				as="textarea"
				style={{ minWidth: "100px" }}
				placeholder="Leave a comment..."
				value={commentText}
				onChange={(e) => {
					setCommentText(e.target.value);
				}}
			/>
			<Button type="submit">{!edit ? "Submit" : "Update"}</Button>
		</Form>
	);
};

export default CommentForm;
