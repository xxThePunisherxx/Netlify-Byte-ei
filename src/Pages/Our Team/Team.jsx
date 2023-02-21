import React from "react";
import style from "./Team.module.css";
import uuid from "react-uuid";
// import { TeamList } from "../../Data/TeamList";
import { SiGmail } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import useFetch from "../../Utils/Hooks/fetch";

const Team = () => {
	const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7]; // just for adding skeleton.

	const { data: TeamResponse, ispending } = useFetch("http://localhost:8080/api/team/");
	console.log(TeamResponse);

	return (
		<>
			{ispending && (
				<div className={style.TrainingGrid}>
					<div className={style.SkelWrapper}>
						{dummyArr.map(() => (
							<div key={uuid()} className={style.Training}>
								<div className={style.Skel}>
									<div className={style.imgDiv}></div>
									<div className={style.H1Div}></div>
									<div className={style.H2Div}></div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{!ispending && (
				<div className={style.Team_Wrapper}>
					<h1>
						Our <span className={style.HeadingHighlight}>Team</span>
					</h1>
					<div className={style.Team_Grid}>
						{TeamResponse.team.map((Person) => (
							<div key={uuid()} className={style.Individual}>
								<img src={Person.image} alt={Person.name} />
								<h1>{Person.name || "No server response"}</h1>
								<div className={style.Details_Grid}>
									<h2>{Person.position || "No server response"}</h2>
									<div className={style.Social_Links}>
										<SiGmail
											onClick={(e) => {
												window.location.href = `mailto:${Person.email}`;
												e.preventDefault();
											}}
										/>
										<a href={Person.socialPlatform}>
											<FaTwitter />
										</a>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Team;
