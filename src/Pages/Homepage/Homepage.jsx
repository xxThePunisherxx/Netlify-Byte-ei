import React from "react";
import Hero from "../../Components/Hero/Hero";
import Training from "../../Components/OurTraining/Training";
import Testimonial from "../../Components/Testimonial/Testimonial";

import Clients from "../../Components/Clients/Clients";
import Map from "../../Components/Map/Map";
import Projects from "../../Components/Projects/Projects";

const Homepage = () => {
	return (
		<>
			<Hero />
			<Training />
			<Testimonial />

			<Projects />
			<Clients />
			<Map />
		</>
	);
};

export default Homepage;
