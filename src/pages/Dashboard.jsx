import React, { useContext } from "react";
import BlogCard from "../components/BlogCard";
import { BlogContext } from "../contexts/BlogContext";

const Dashboard = () => {
	const { blogs } = useContext(BlogContext);
	console.log(blogs)
	return (
		<div>
			<div className="d-flex justify-content-center align-items-center">
				<div
					className="mx-2 mb-2"
					style={{ height: "5px", width: "100px", backgroundColor: "white" }}
				></div>
				<h1 className="text-light my-3">Dashboard</h1>
				<div
					className="mx-2 mb-2"
					style={{ height: "5px", width: "100px", backgroundColor: "white" }}
				></div>{" "}
			</div>
			<div className="d-flex flex-wrap p-3 gap-3 justify-content-center">
				{blogs.map((blog) => {
					return <BlogCard key={blog.id} blog={blog} />;
				})}
			</div>
		</div>
	);
};

export default Dashboard;
