import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import {FaEdit} from 'react-icons/fa';
import {RiDeleteBinFill} from 'react-icons/ri'
import { AuthContext } from '../contexts/AuthContext';
import { ProfileContext } from '../contexts/ProfileContext';

const ProfileCard = (props) => {
    const { imgUrl, author, hobbies, hometown, email, userId, id } = props.profile;

    let { currentUser, navigate } = useContext(AuthContext);
    let { setHometown, setImgUrl, setHobbies, setEmail, setUpdateId, setEdit, deleteProfile } = useContext(ProfileContext);
    
    const handleUpdate = () => {
		setHometown(hometown);
		setImgUrl(imgUrl);
		setHobbies(hobbies);
		setEmail(email);
		setUpdateId(id);
		setEdit(true);
		navigate("/profile");
	};
    

	return (
		<div
			className="rounded shadow  p-2"
			style={{ width: "25rem", backgroundColor: "#d3d3d3e2"}}
		>
			<img
				classNames="d-block m-auto"
				style={{ width: "10rem" }}
				src={imgUrl}
				alt={author}
			/>
			<Card.Body>
				<Card.Title>{author}</Card.Title>
				<Card.Subtitle>{hometown}</Card.Subtitle>
				<Card.Text>{hobbies}</Card.Text>
			</Card.Body>
            {currentUser.uid === userId ? (
				<>
					<div className="d-flex gap-3 justify-content-center">
						<button
							style={{ backgroundColor: "transparent", border: "none" }}
							type="button"
							onClick={handleUpdate}
						>
							<FaEdit style={{ fontSize: "2rem", color: "green" }} />
						</button>
						<button
							style={{ backgroundColor: "transparent", border: "none" }}
							type="button"
							onClick={() => deleteProfile(id)}
						>
							<RiDeleteBinFill style={{ fontSize: "2rem", color: "red" }} />
						</button>
					</div>
                    <a href={`mailto:${email}`}>Send Fan Mail</a>
				</>
			) : (
				<a href={`mailto:${email}`}>Send Fan Mail</a>
			)}
		</div>
    )
}

export default ProfileCard