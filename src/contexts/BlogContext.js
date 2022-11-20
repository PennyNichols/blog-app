import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../helpers/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";
import { EditorState } from "draft-js";

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);

	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [body, setBody] = useState("");
	const [headline, setHeadline] = useState("");
	const [blogs, setBlogs] = useState([]);
	const [edit, setEdit] = useState(false);
	const [updateId, setUpdateId] = useState("");
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	const current = new Date();
	const date = `${
		current.getMonth() + 1
	}/${current.getDate()}/${current.getFullYear()}`;

	const writeToDatabase = () => {
		const blogRef = ref(db, "Blog");
		const newBlogRef = push(blogRef);
		set(newBlogRef, {
			title: title,
			headline: headline,
			imgUrl: imgUrl,
			body: body,
			author: currentUser.displayName,
			userId: currentUser.uid,
			commentCount: "0",
			like: "0",
			likes: [""],
			date: date,
		});
		setTitle("");
		setHeadline("");
		setImgUrl("");
		setBody("");
		setEditorState(EditorState.createEmpty());
	};

	useEffect(() => {
		const blogRef = ref(db, "Blog");
		onValue(blogRef, (snapshot) => {
			const data = snapshot.val();
			const blogArr = [];
			for (let id in data) {
				blogArr.push({ id, ...data[id] });
			}
			setBlogs(blogArr.reverse());
		});
	}, []);

	const handleSubmit = (e, navigate) => {
		e.preventDefault();
		if (!edit) {
			writeToDatabase();
			setTitle("");
			setHeadline("");
			setImgUrl("");
			setBody("");
			setEditorState(EditorState.createEmpty());
			toast.success("New Blog Added");
		} else {
			updateBlog();
		}
		navigate("/");
	};

	const deleteBlog = (id, navigate) => {
		remove(ref(db, "Blog/" + id));
		toast.error("Blog deleted");
		navigate("/");
	};

	const updateBlog = () => {
		update(ref(db, "Blog/" + updateId), {
			title: title,
			headline: headline,
			imgUrl: imgUrl,
			body: body,
			author: currentUser.displayName,
			userId: currentUser.uid,
			date: date,
		});
		setTitle("");
		setHeadline("");
		setImgUrl("");
		setBody("");
		setEdit(false);
		setUpdateId("");
		setEditorState(EditorState.createEmpty());
		toast.success("Blog Updated");
	};

	const handleLike = (blog) => {
		if (!Object.values(blog.likes).includes(currentUser.uid)) {
			update(ref(db, "Blog/" + blog.id), {
				...blog,
				like: +blog.like + 1,
				likes: [...blog.likes, currentUser.uid],
			});
			console.log("liked");
		} else {
			update(ref(db, "Blog/" + blog.id), {
				...blog,
				like: +blog.like - 1,
				likes: blog.likes.filter((user) => user !== currentUser.uid),
			});
			console.log("unliked");
		}
	};

	return (
		<BlogContext.Provider
			value={{
				title,
				imgUrl,
				body,
				setTitle,
				setImgUrl,
				setBody,
				writeToDatabase,
				blogs,
				deleteBlog,
				updateBlog,
				edit,
				setEdit,
				setUpdateId,
				handleSubmit,
				editorState,
				setEditorState,
				headline,
				setHeadline,
				handleLike,
			}}
		>
			{children}
		</BlogContext.Provider>
	);
};

export default BlogProvider;
