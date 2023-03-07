import React from "react";
import style from "./StudentProjects.module.css";
import { Link } from "react-router-dom";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";

const StudentProject = () => {
	const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7]; // just for adding skeleton.

	const { data: ProjectData, ispending } = useFetch("https://backendapp.up.railway.app/api/project");
	let ProjectDataArr = ProjectData?.studentProjects;
	return (
		<div className={style.TrainingContainer}>
			<h1 className={style.MainHeading}>
				Projects done<span className={style.HeadingHighlight}> by our students</span>
			</h1>
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
							<img src={item.image} alt={item.title} />
							<h1>{item.title}</h1>
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

export default StudentProject;
