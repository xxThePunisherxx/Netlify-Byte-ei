import React from "react";
import style from "./IndividualCourse.module.css";
import { Link, useParams } from "react-router-dom";
import { FaClock, FaUserTie } from "react-icons/fa";
import useFetch from "../../Utils/Hooks/fetch";

const IndividualCourse = () => {
	const { courseID } = useParams();
	// const [IndividualtrainingData, setIndividualTrainingData] = useState([{}]);
	const { data: IndividualtrainingData, ispending } = useFetch(`https://backendapp.up.railway.app/api/training/${courseID}`);

	return (
		<>
			{ispending && (
				<div className={style.Skel}>
					<div className={style.imgDiv}></div>
					<div className={style.H1Div}></div>
				</div>
			)}
			{!ispending && (
				<div className={style.IndividualPageWrapper}>
					<div className={style.Training_header}>
						<div className={style.Training_contents}>
							<h1>{IndividualtrainingData.trainings.title}</h1>
							<div className={style.Training_header_sub}>
								<h2>
									<FaClock /> &nbsp; Duration &nbsp; {IndividualtrainingData.trainings.duration}
								</h2>

								<h2>
									<FaUserTie /> &nbsp; Career&nbsp; {IndividualtrainingData.trainings.career}
								</h2>
							</div>
							<div className={style.training_header_btn}>
								<Link to={"/inquiry"}>
									<button>Send Enquiry</button>
								</Link>

								<button>
									<Link to={"/enroll"}>
										Enroll
										<div className={style.arrow_wrapper}>
											<div className={style.arrow}></div>
										</div>
									</Link>
								</button>
							</div>
						</div>
					</div>
					<div className={style.Training_DescriptionWrapper}>
						<div className={style.Training_Description}>
							<h1 className={style.Description_Heading}>{IndividualtrainingData.trainings.title}</h1>
							<div dangerouslySetInnerHTML={{ __html: IndividualtrainingData.trainings.description }}></div>
						</div>
						<div className={style.course_overview}>
							<div className={style.BannerHeading}>
								<h1>Course Outline</h1>
							</div>

							<div>
								<div className={style.course_overview_contents}>
									<div className={style.Syllabus} dangerouslySetInnerHTML={{ __html: IndividualtrainingData.trainings.syllabus }}></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default IndividualCourse;
