import React from "react";
import style from "./Courses.module.css";
import { Link } from "react-router-dom";
import useFetch from "../../Utils/Hooks/fetch";

const Courses = () => {
	const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7]; // just for adding skeleton.

	const { data: trainingData, ispending } = useFetch("http://localhost:8080/api/training");
	let TrrainingDataArr = trainingData?.training;

	return (
		<div className={style.TrainingContainer}>
			<h1 className={style.MainHeading}>
				Our <span className={style.HeadingHighlight}>trainings</span>
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
			<div className={style.TrainingGrid}>
				{TrrainingDataArr.map((item) => (
					<Link to={`/course-view/${item._id}`} key={item._id}>
						<div className={style.Training} key={item._id}>
							<img src={item.image} alt={item.Title} />
							<h1>{item.title}</h1>
							<h2>Duration: {item.duration}</h2>
							<button>View Details</button>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Courses;
