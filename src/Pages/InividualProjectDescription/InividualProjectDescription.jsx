import React from "react";
import style from "./InividualProjectDescription.module.css";
import useFetch from "../../Utils/Hooks/fetch";
// import { useState } from "react";
// import { useEffect } from "react";
import { useParams } from "react-router";

const InividualProjectDescription = () => {
	const { projectID } = useParams();
	let githubLink = "";
	const { data: ProjectData, ispending } = useFetch(`https://learning-management-system-kx6y.onrender.com/api/project/${projectID}`);
	console.log(ProjectData.studentProject);
	if (ProjectData.studentProject) {
		githubLink = `https://${ProjectData.studentProject.githubLink}`;
	}
	return (
		<>
			{!ispending && (
				<div className={style.project_wrapper}>
					<div className={style.Project_Heading}>
						<h1>{ProjectData.studentProject.title}</h1>
						<h2>{ProjectData.studentProject.name}</h2>
					</div>
					<div className={style.Project_Body}>
						<div className={style.ck_description} dangerouslySetInnerHTML={{ __html: ProjectData.studentProject.description }}></div>
						<a href={githubLink}>
							<h2>View Source Code</h2>
						</a>
					</div>
				</div>
			)}
		</>
	);
};

export default InividualProjectDescription;
