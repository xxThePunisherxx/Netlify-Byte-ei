import React from "react";
import style from "./Projects.module.css";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

const Projects = () => {
	// ---------------------------------------------------just for adding skeleton.----------------------------------------------------------------------
	const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7];

	const { data: ProjectData, ispending } = useFetch("https://byte-backend-demo.up.railway.app/api/project");
	let ProjectDataArr = ProjectData?.studentProjects;

	return (
		<div className={style.ProjectWrapper}>
			<div>
				<h1 className={style.MainHeading}>
					Students <span className={style.headingHighlights}>Projects</span>
				</h1>
			</div>
			{ispending && (
				<div className={style.TrainingGrid}>
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
			)}
			{!ispending && (
				<div className={style.TrainingGrid}>
					{ProjectDataArr.map((item) => (
						<div className={style.Training} key={item._id}>
							<img src={item.image} alt={item.Title} />
							<div dangerouslySetInnerHTML={{ __html: item.title }}></div>
							<Link to={`/project-view/${item._id}`}>
								<button>Learn more</button>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Projects;
