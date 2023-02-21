import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const useFetchAuth = (url) => {
	const { auth } = useAuth();

	const [ispending, setIsPending] = useState(true);
	const [data, setData] = useState({ training: [] });
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	useEffect(() => {
		async function fetchData() {
			try {
				let response = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${auth.Token}`,
						withCredentails: true,
					},
				});
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);
	return { data, ispending, error, response };
};
export default useFetchAuth;
