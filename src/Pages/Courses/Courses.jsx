import React from "react";
import style from "./Courses.module.css";
import { Link } from "react-router-dom";
import useFetch from "../../Utils/Hooks/fetch";
import uuid from "react-uuid";

const Courses = () => {
	const dummyArr = [0, 1, 2, 3, 4, 5, 6, 7]; // just for adding skeleton.

	const { data: trainingData, ispending } = useFetch("https://backendapp.up.railway.app/api/training");
	let TrrainingDataArr = trainingData?.training;

	return (
		<div className={style.TrainingContainer}>
			<h1 className={style.MainHeading}>
				Our <span className={style.HeadingHighlight}>trainings</span>
			</h1>
			{ispending && (
				<div className={style.TrainingGrid}>
					{dummyArr.map(() => (
						<div className={style.Training} key={uuid()}>
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
					<div key={uuid()} className={style.Training}>
						<img src={item.image} alt={item.Title} />
						<h1>{item.title}</h1>
						<h2>Duration: {item.duration}</h2>
						<Link to={`/course-view/${item._id}`}>
							<button>Learn more</button>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default Courses;
