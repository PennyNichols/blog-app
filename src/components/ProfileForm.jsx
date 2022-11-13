import React, { useContext } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { ProfileContext } from "../contexts/ProfileContext";

const ProfileForm = () => {
    const {
        hometown,
        setHometown,
        imgUrl,
        setImgUrl,
        hobbies,
        setHobbies,
        email,
        setEmail,
        handleSubmit,
        edit,
    } = useContext(ProfileContext);

	return (
		<Container
			className="container-fluid p-4"
			style={{ backgroundColor: "#d3d3d3e2", width: "24rem" }}
		>
			<h2 className="pb-3">Profile Details</h2>
			<Form  onSubmit={handleSubmit}>
				<Form.Control
					type="text"
					placeholder="Hometown"
					value={hometown}
					onChange={(e) => setHometown(e.target.value)}
				/>
				<Form.Control
					className="my-2"
					type="text"
					placeholder="Image URL"
					value={imgUrl}
					onChange={(e) => setImgUrl(e.target.value)}
				/>
				<Form.Control
					className="my-2"
					type="text"
					placeholder="Hobbies"
					value={hobbies}
					onChange={(e) => setHobbies(e.target.value)}
				/>
				<Form.Control
					className="my-2"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<Button className="my-2 w-100" type="submit">
                    {edit ? 'Update' : 'Submit'}
				</Button>
			</Form>
		</Container>
	);
};

export default ProfileForm;
