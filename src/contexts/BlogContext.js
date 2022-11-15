import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../helpers/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const BlogContext = createContext();

const BlogProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()

	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [body, setBody] = useState("");
	const [blogs, setBlogs] = useState([]);
	const [edit, setEdit] = useState(false);
	const [updateId, setUpdateId] = useState("");
    
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
   

	const writeToDatabase = () => {
		const blogRef = ref(db, "Blog");
		const newBlogRef = push(blogRef);
		set(newBlogRef, {
			title: title,
			imgUrl: imgUrl,
			body: body,
            author: currentUser.displayName,
            userId: currentUser.uid,
            date: date,
		});
		setTitle("");
		setImgUrl("");
		setBody("");
	};

	useEffect(() => {
		const blogRef = ref(db, "Blog");
		onValue(blogRef, (snapshot) => {
			const data = snapshot.val();
			const blogArr = [];
			for (let id in data) {
				blogArr.push({ id, ...data[id] });
			}
			setBlogs(blogArr);
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!edit) {
			writeToDatabase();
			setTitle("");
			setImgUrl("");
			setBody("");
			toast.success("New Blog Added");
		} else {
			updateBlog();
		}
        navigate('/')
	};

	const deleteBlog = (id) => {
		remove(ref(db, "Blog/" + id));
		toast.error("Blog deleted");
        navigate('/')
	};

	const updateBlog = () => {
		update(ref(db, "Blog/" + updateId), {
			title: title,
			imgUrl: imgUrl,
			body: body,
            author: currentUser.displayName,
            userId: currentUser.uid,
            date: date,

		});
		setTitle("");
		setImgUrl("");
		setBody("");
		setEdit(false);
		setUpdateId("");
		toast.success("Blog Updated");
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
			}}
		>
			{children}
		</BlogContext.Provider>
	);
};

export default BlogProvider;
