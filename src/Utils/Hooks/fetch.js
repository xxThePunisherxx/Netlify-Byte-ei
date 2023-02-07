import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url) => {
	const [ispending, setIsPending] = useState(true);
	const [data, setData] = useState({ training: [] });
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				let response = await axios.get(url);
				setData(response.data);
				setIsPending(false);
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
	}, [url]);
	return { data, ispending, error, response };
};
export default useFetch;
