import React from "react";

import style from "./Test.module.css";
import { useState, useEffect } from "react";

const Test = () => {
	// const [test, setTest] = useState([{ firstName: "", lastName: { middleName: "", finalName: "" } }]);
	// useEffect(() => {
	// 	// setTest((test) => ({ ...test, firstName: "asdasdad" }));
	// 	setTest((test) => ({ ...test, lastName: { middleName: "middTest", finalName: "finalTEst" } }));
	// }, []);
	// console.log(test);
	const [courseModuleHeadingList, setCourseModuleHeadingList] = useState([{}]);
	// const [courseModuleHeadingListItems, setCourseModuleHeadingListItems] = useState([{}]);

	const handleSyllabusHeadingAddition = () => {
		setCourseModuleHeadingList([...courseModuleHeadingList, { CourseSyllabusHeading: "", courseListArray: [0, 1, 2, 0] }]);
	};
	const handleSyllabusHeadingRemove = (index) => {
		const list = [...courseModuleHeadingList];
		list.splice(index, 1);
		setCourseModuleHeadingList(list);
	};
	const handleSyllabusHeadingChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...courseModuleHeadingList];
		list[index][name] = value;
		setCourseModuleHeadingList(list);
	};
	return (
		<div className={style.mid}>
			<div className={style.dynamicModuleHeading}>
				<label htmlFor="CourseSyllabusHeading">Course Syllabus Heading(s)</label>
				{courseModuleHeadingList.map((singleHeading, index) => (
					<div key={index} className={style.dynamicModuleHeading_Headings}>
						<div className={style.dynamicModuleHeading_firstDiv}>
							<input
								type="text"
								name="CourseSyllabusHeading"
								id="CourseSyllabusHeading"
								// required
								value={singleHeading.CourseSyllabusHeading}
								onChange={(e) => handleSyllabusHeadingChange(e, index)}
								placeholder="Module Heading"
							/>

							{courseModuleHeadingList.length - 1 === index && <button onClick={handleSyllabusHeadingAddition}>Add new Module Heading</button>}
							<br></br>
							{/* for list subhedings */}
							<label htmlFor="CourseModuleHeadingListItem">Course Module List Items</label>
							{/* {singleHeading.courseListArray.map((singleListItem, index) => console.log(singleListItem))} */}
							{console.log(singleHeading.courseListArray)}
						</div>
						<div className={style.dynamicModuleHeading_secondDiv}>
							{courseModuleHeadingList.length > 1 && (
								<button
									onClick={() => {
										handleSyllabusHeadingRemove(index);
									}}
								>
									Remove module Heading
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Test;
