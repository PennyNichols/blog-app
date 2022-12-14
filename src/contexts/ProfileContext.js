import { useState, useEffect, createContext, useContext } from "react";
import { db } from "../helpers/firebase";
import { ref, set, push, onValue, remove, update } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
	const { currentUser } = useContext(AuthContext);

	const [imgUrl, setImgUrl] = useState("");
	const [hometown, setHometown] = useState("");
	const [hobbies, setHobbies] = useState("");
	const [email, setEmail] = useState("");
	const [profiles, setProfiles] = useState([]);
	const [edit, setEdit] = useState(false);
	const [updateId, setUpdateId] = useState("");
	const [isFound, setIsFound] = useState(false);

	const writeToDatabase = () => {
		const profileRef = ref(db, "Profile");
		const newProfileRef = push(profileRef);
		set(newProfileRef, {
			hometown: hometown,
			imgUrl: imgUrl,
			hobbies: hobbies,
			email: email,
			author: currentUser.displayName,
			userId: currentUser.uid,
		});
		setHometown("");
		setImgUrl("");
		setHobbies("");
		setEmail("");
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

	const handleSubmit = (e, navigate) => {
		e.preventDefault();
		if (!edit && !isFound) {
			writeToDatabase();
			setHometown("");
			setImgUrl("");
			setHobbies("");
			setEmail("");
			toast.success("New Profile Added");
		} else if (isFound) {
			if (edit) {
				updateProfile();
			} else {
				handleReject();
			}
		}
		navigate("/about");
	};

	const deleteProfile = (id, navigate) => {
		remove(ref(db, "Profile/" + id));
		toast.error("Profile deleted");
		navigate("/");
	};

	const updateProfile = () => {
		update(ref(db, "Profile/" + updateId), {
			hometown: hometown,
			imgUrl: imgUrl,
			hobbies: hobbies,
			email: email,
			author: currentUser.displayName,
			userId: currentUser.uid,
		});
		setHometown("");
		setImgUrl("");
		setHobbies("");
		setEmail("");
		setEdit(false);
		setUpdateId("");
		toast.success("Profile Updated");
	};

	const handleReject = () => {
		setHometown("");
		setImgUrl("");
		setHobbies("");
		setEmail("");
		// navigate("/about");
		toast.error("Profile already exists for this user");
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
				email,
				setEmail,
				writeToDatabase,
				profiles,
				deleteProfile,
				updateProfile,
				edit,
				setEdit,
				setUpdateId,
				handleSubmit,
				handleReject,
				isFound,
				setIsFound,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileProvider;
