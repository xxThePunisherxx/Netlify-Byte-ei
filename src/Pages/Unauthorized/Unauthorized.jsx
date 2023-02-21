import React from "react";
import style from "./Unauthorized.module.css";
import { Link } from "react-router-dom";

const Unauthorized = () => {
	return (
		<div className={style.notfoundContainer}>
			<div className={style.contents}>
				<h1>You are not supposed to see this. </h1>
				<Link to={"/"}>
					<button>Go back to homepage.</button>
				</Link>
			</div>
		</div>
	);
};

export default Unauthorized;
