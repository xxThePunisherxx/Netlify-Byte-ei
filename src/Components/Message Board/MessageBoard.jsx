import React from "react";

const MessageBoard = (props) => {
	return (
		<div className={props.Message_type}>
			<h1>{props.Message}</h1>
		</div>
	);
};

export default MessageBoard;
