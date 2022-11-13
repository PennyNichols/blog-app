import React, { useContext } from "react";
import ProfileCard from "../components/ProfileCard";
import { ProfileContext } from "../contexts/ProfileContext";

const About = () => {
	const { profiles } = useContext(ProfileContext);

    console.log(profiles)

	return (
		<div>
			<div className="d-flex justify-content-center align-items-center">
				<div
					className="mx-2 mb-2"
					style={{ height: "5px", width: "100px", backgroundColor: "white" }}
				></div>
				<h1 className="text-light my-3">Meet Our Authors</h1>
				<div
					className="mx-2 mb-2"
					style={{ height: "5px", width: "100px", backgroundColor: "white" }}
				></div>{" "}
			</div>
			<div className="d-flex flex-wrap p-3 gap-3 justify-content-center">
				{profiles.map((profile) => {
					return <ProfileCard key={profile.id} profile={profile} />;
				})}
			</div>
		</div>
	);
};

export default About;
