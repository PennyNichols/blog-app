import React, { useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { BlogContext } from "../contexts/BlogContext";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const BlogForm = () => {
	const {
		title,
		imgUrl,
		body,
		setTitle,
		setImgUrl,
		setBody,
		edit,
		handleSubmit,
		editorState,
		setEditorState,
		headline,
		setHeadline,
	} = useContext(BlogContext);

	console.log(body);

	return (
		<div>
			<div className="p-5">
				<Container
					className="container-fluid p-4 rounded shadow-lg"
					style={{ backgroundColor: "#d3d3d3e2", width: "40rem" }}
				>
					<h2 className="pb-3">Post</h2>
					<Form onSubmit={handleSubmit}>
						<Form.Control
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Form.Control
							className="my-2"
							type="text"
							placeholder="Headline"
							value={headline}
							onChange={(e) => setHeadline(e.target.value)}
						/>
						<Form.Control
							className="my-2"
							type="text"
							placeholder="Image URL"
							value={imgUrl}
							onChange={(e) => setImgUrl(e.target.value)}
						/>

						<Editor
							placeholder="Write your post here..."
							defaultEditorState={editorState}
							onEditorStateChange={(newState) => {
								setEditorState(newState);
								setBody(
									draftToHtml(convertToRaw(newState.getCurrentContent()))
								);
							}}
							editorClassName="editor-class rounded"
							toolbarClassName="toolbar-class rounded"
						/>

						<Button className="my-2 w-100" type="submit">
							{edit ? "Update" : "Submit"}
						</Button>
						<div className="border">
							<h4>Post Preview</h4>
							<div
								dangerouslySetInnerHTML={{
									__html: body,
								}}
							/>
						</div>
					</Form>
				</Container>
			</div>
		</div>
	);
};

export default BlogForm;
