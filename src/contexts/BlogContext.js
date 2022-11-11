import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../firebase/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext();

const BlogContextProvider = ({ children }) => {
    const {currentUser } = useContext(AuthContext);


	const [title, setTitle] = useState("");
	const [imgUrl, setImgUrl] = useState("");
	const [body, setBody] = useState("");
	const [blogs, setBlogs] = useState([]);
    const [edit, setEdit] = useState(false);
    const [updateId, setUpdateId] = useState("")

	const writeToDatabase = () => {
		const blogRef = ref(db, "Blog");
		const newBlogRef = push(blogRef);
		set(newBlogRef, {
			title: title,
			imgUrl: imgUrl,
			body: body,
            userId: currentUser.uid
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
            toast.success('New Blog Added')

		} else {
			updateBlog();
            
		}
	};

    const deleteBlog = (id) => {
        remove(ref(db, 'Blog/' + id))
        toast.error('Blog deleted')
    }

    const updateBlog = () =>{
        update(ref(db, 'Blog/' + updateId), {
			title: title,
			imgUrl: imgUrl,
			body: body,
            userId: currentUser.uid
        })
        setTitle("");
		setImgUrl("");
		setBody("");
        setEdit(false);
        setUpdateId('')
        toast.success('Blog Updated');
    }


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
                handleSubmit
			}}
		>
			{children}
		</BlogContext.Provider>
	);
};

export default BlogContextProvider;