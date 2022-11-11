import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const BlogForm = () => {
	const [title, setTitle] = useState();
	const [imgUrl, setImgUrl] = useState();
	const [content, setContent] = useState();
	const handleNewBlog = () => {};

	return (
		<div>
			<div className="p-5">
				<Container
					className="container-fluid p-4"
					style={{ backgroundColor: "#d3d3d3e2", width: "24rem" }}
				>
					<h2 className="pb-3">New Post</h2>
					<Form>
						<Form.Control
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Form.Control
							className="my-2"
							type="text"
							placeholder="Image URL"
							value={imgUrl}
							onChange={(e) => setImgUrl(e.target.value)}
						/>
						<Form.Control
                            placeholder='Write post details here'
							as="textarea"
							rows={5}
							className="my-2"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
						<Button
							className="my-2 w-100"
							type="submit"
							onClick={handleNewBlog}
						>
							Submit
						</Button>
					</Form>
				</Container>
			</div>
		</div>
	);
};

export default BlogForm;
