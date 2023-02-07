import { useState, useEffect } from "react";
import axios from "axios";
const useDelete = (url, id) => {
	// const [isDeleting, setIsDeleting] = useState(true);
	// const [data, setData] = useState([{}]);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				// 	let response = await axios.get("http://localhost:8080/api/training");
				let response = await axios.delete("http://localhost:8080/api/training/delete/" + id);
				// 	setData(response.data);
				// setIsDeleting(false);
				setResponse(response);
			} catch (error) {
				if (error.response) {
					console.log(error.response.status);
					console.log(error.response.headers);
				} else {
					console.log(`Error: ${error.message}`);
				}
				setError(error.message);
			}
		}
		fetchData();
	}, [id, url]);
	return { error, response };
};
export default useDelete;
