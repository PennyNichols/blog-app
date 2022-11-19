import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../helpers/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";

export const CommentContext = createContext();

const CommentProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);

    const [commentText, setCommentText] = useState('')
    const [blogId, setBlogId] = useState('')
    const [comments, setComments] = useState([])
	const [edit, setEdit] = useState(false)
	const [updateId, setUpdateId] = useState('')

	const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
   


	const writeToDatabase = () => {
		const commentRef = ref(db, "Comment");
		const newCommentRef = push(commentRef);
		set(newCommentRef, {
			comment: commentText,
			author: currentUser.displayName,
            userId: currentUser.uid,
			blogId: blogId,
            date: date,
		})
		setCommentText("");
	};

	useEffect(() => {
		const commentRef = ref(db, "Comment");
		onValue(commentRef, (snapshot) => {
			const data = snapshot.val();
			const commentArr = [];
			for (let id in data) {
				commentArr.push({ id, ...data[id] });
			}
			setComments(commentArr.reverse());
		});
	}, []);

	const handleComment = (e) => {
		e.preventDefault();
		if (!edit) {
			writeToDatabase();
			setCommentText("");
			toast.success("New Comment Added");
		} else {
			updateComment();
		}
	};

	const deleteComment = (id) => {
		remove(ref(db, "Comment/" + id));
		toast.error("Comment deleted");
	};

	const updateComment = () => {
		update(ref(db, "Comment/" + updateId), {
			comment: commentText,
			author: currentUser.displayName,
            userId: currentUser.uid,
			blogId: blogId,
            date: date,
		});
		setCommentText("");
		setEdit(false);
		setUpdateId("");
		toast.success("Comment Updated");
	};

	

	return (
		<CommentContext.Provider
			value={{
				writeToDatabase,
				edit,
				setEdit,
				setUpdateId,
				commentText,
				setCommentText,
				setBlogId,
				comments,
				handleComment,
				deleteComment,
				updateComment
			}}
		>
			{children}
		</CommentContext.Provider>
	);
};

export default CommentProvider;
