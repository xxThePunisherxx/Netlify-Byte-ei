import React from "react";
import { Link } from "react-router-dom";
import style from "./Notfound.module.css";
const NotFound = () => {
	return (
		<div className={style.notfoundContainer}>
			<div className={style.contents}>
				<h1>Oops.. this was not supposed to happen. </h1>
				<Link to={"/"}>
					<button>Go back to homepage.</button>
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
