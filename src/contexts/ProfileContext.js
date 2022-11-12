import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../helpers/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate()

	const [imgUrl, setImgUrl] = useState("");
	const [hometown, setHometown] = useState("");
	const [hobbies, setHobbies] = useState("");
	const [profiles, setProfiles] = useState("");
	const [authorBlogs, setAuthorBlogs] = useState([]);
	const [edit, setEdit] = useState(false);
	const [updateId, setUpdateId] = useState("");

	const writeToDatabase = () => {
		const profileRef = ref(db, "Profile");
		const newProfileRef = push(profileRef);
		set(newProfileRef, {
			hometown: hometown,
			imgUrl: imgUrl,
			hobbies: hobbies,
            author: currentUser.displayName,
            userId: currentUser.uid,
		});
		setHometown("");
		setImgUrl("");
		setHobbies("");
	};

	useEffect(() => {
		const profileRef = ref(db, "Profile");
		onValue(profileRef, (snapshot) => {
			const data = snapshot.val();
			const profileArr = [];
			for (let id in data) {
				profileArr.push({ id, ...data[id] });
			}
			setProfiles(profileArr);
		});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!edit) {
			writeToDatabase();
			setHometown("");
			setImgUrl("");
			setHobbies("");
			toast.success("New Profile Added");
		} else {
			updateProfile();
		}
	};

	const deleteProfile = (id) => {
		remove(ref(db, "Profile/" + id));
		toast.error("Profile deleted");
        navigate('/')
	};

	const updateProfile = () => {
		update(ref(db, "Profile/" + updateId), {
			hometown: hometown,
			imgUrl: imgUrl,
			hobbies: hobbies,
            author: currentUser.displayName,
            userId: currentUser.uid,
		});
		setHometown("");
		setImgUrl("");
		setHobbies("");
		setEdit(false);
		setUpdateId("");
		toast.success("Profile Updated");
	};

	return (
		<ProfileContext.Provider
			value={{
				hometown,
				imgUrl,
				hobbies,
				setHometown,
				setImgUrl,
				setHobbies,
				writeToDatabase,
				profiles,
				deleteProfile,
				updateProfile,
				edit,
				setEdit,
				setUpdateId,
				handleSubmit,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileProvider;