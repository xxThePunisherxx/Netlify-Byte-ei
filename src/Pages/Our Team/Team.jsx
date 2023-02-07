import React from "react";
import style from "./Team.module.css";
import uuid from "react-uuid";
import { TeamList } from "../../Data/TeamList";
import { SiGmail } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

const Team = () => {
	return (
		<div className={style.Team_Wrapper}>
			<h1>
				Our <span className={style.HeadingHighlight}>Team</span>
			</h1>
			<div className={style.Team_Grid}>
				{TeamList.map((Person) => (
					<div key={uuid()} className={style.Individual}>
						<img src={Person.Image} alt={Person.Name} />
						<h1>{Person.Name}</h1>

						<div className={style.Details_Grid}>
							<h2>{Person.Position}</h2>
							<div className={style.Social_Links}>
								<SiGmail
									onClick={(e) => {
										window.location.href = `mailto:${Person.Mail}`;
										e.preventDefault();
									}}
								/>

								<FaTwitter
									onClick={(e) => {
										window.location.href = `${Person.Twitter}`;
										e.preventDefault();
									}}
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Team;
