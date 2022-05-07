import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const JobModels = (props) => {
	const [isHovering, setIsHovering] = useState(false);

	const paperStyle = {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.03)",
		borderRadius: 1,
		border: "1px solid rgba(0, 0, 0, 0.52)",
		px: 1,
		m: 0.25,
	};

	// const onModelHover = (event) => {
	// 	setIsHovering(!isHovering);
	// };

	return (
		<Paper
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			sx={{
				...paperStyle,
				cursor: "pointer",
				"&:hover": {
					backgroundColor: "rgba(255, 25, 25, 0.8)",
				},
			}}
		>
			<Typography variant="body1">
				{isHovering ? props.model + " X" : props.model}
			</Typography>
		</Paper>
	);
};

export default JobModels;
