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

    const defaultImg = `https://robohash.org/${author}`
    
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
			className="rounded shadow-lg  p-2 d-flex flex-column"
			style={{ width: "25rem", backgroundColor: "#d3d3d3e2"}}
		>
			<img
				classNames=" my-3"
				style={{ width: "10rem", alignSelf:'center' }}
				src={imgUrl || defaultImg}
				alt={author}
			/>
			<Card.Body>
				<Card.Title className='my-2'>{author}</Card.Title>
				<Card.Subtitle className='my-2'>Hometown: {hometown}</Card.Subtitle>
				<Card.Text className='my-2'><b>Hobbies:</b> {hobbies}</Card.Text>
			</Card.Body>
            {currentUser.uid === userId ? (
				<>
					<div className="d-flex gap-3 justify-content-center my-3">
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
				</>
			) : (
				<a style={{textDecoration:'none', textTransform:'uppercase'}} href={`mailto:${email}`}>Send some love</a>
			)}
		</div>
    )
}

export default ProfileCard