import React from "react";
import style from "./Unauthorized.module.css";
import { Link } from "react-router-dom";

const Unauthorized = () => {
	return (
		<div className={style.notfoundContainer}>
			<div className={style.contents}>
				<h1>Sorry, you do not have permission to access this page. Please contact the administrator if you think this is a mistake.</h1>
				<Link to={"/"}>
					<button>Go back to homepage.</button>
				</Link>
			</div>
		</div>
	);
};

export default Unauthorized;
