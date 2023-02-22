import React from "react";
import style from "./Training.module.css";
import { Link } from "react-router-dom";
import uuid from "react-uuid";
import useFetch from "../../Utils/Hooks/fetch";

const Training = () => {
	const dummyArr = [0, 1, 2, 3]; // just for adding skeleton.
	const { data: trainingData, ispending } = useFetch("https://learning-management-system-kx6y.onrender.com/api/training");
	let TrrainingDataArr = trainingData?.training;
	let SlicedTraining = TrrainingDataArr.slice(0, 12);

	return (
		<div className={style.TrainingContainer}>
			<h1 className={style.MainHeading}>
				Our <span className={style.HeadingHighlight}>trainings</span>
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
					{SlicedTraining.map((item) => (
						<Link to={`course-view/${item._id}`} key={uuid()}>
							<div className={style.Training}>
								<img src={item.image} alt={item.title} />
								<h1>{item.title}</h1>
								<h2>Duration: {item.duration}</h2>
							</div>
						</Link>
					))}
				</div>
			)}

			{!ispending && (
				<Link to={"/courses"}>
					<button>View all courses</button>
				</Link>
			)}
		</div>
	);
};

export default Training;
