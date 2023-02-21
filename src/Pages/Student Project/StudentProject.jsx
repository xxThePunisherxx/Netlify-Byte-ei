import React from "react";
import style from "./StudentProjects.module.css";
import { Link } from "react-router-dom";
import useFetch from "../../Utils/Hooks/fetch";

const StudentProject = () => {
	const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7]; // just for adding skeleton.

	const { data: ProjectData, ispending } = useFetch("http://localhost:8080/api/student");
	let ProjectDataArr = ProjectData?.projects;
	return (
		<div className={style.TrainingContainer}>
			<h1 className={style.MainHeading}>
				Projects done<span className={style.HeadingHighlight}> by our students</span>
			</h1>
			{ispending && (
				<div className={style.TrainingGrid}>
					{dummyArr.map(() => (
						<div className={style.Training}>
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
							<h1>{item.title}</h1>
							<h2>Duration: {item.duration}</h2>
							<Link to={`/course-view/${item._id}`}>
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
