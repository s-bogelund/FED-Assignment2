import { Paper, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const JobModels = (props) => {
	const [isHovering, setIsHovering] = useState(false);

	const paperStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.03)",
		borderRadius: 1,
		border: "1px solid rgba(0, 0, 0, 0.52)",
		px: 1,
		height: "2rem",
		m: 0.25,
	};

	// const onModelHover = (event) => {
	// 	setIsHovering(!isHovering);
	// };

	return (
		<Tooltip title="Click to remove" placement="top">
			<Paper
				onMouseEnter={() => setIsHovering(true)}
				onMouseLeave={() => setIsHovering(false)}
				onClick={() => props.onDelete(props.model)}
				sx={{
					...paperStyle,
					cursor: "pointer",
					width: props.model.length * 12 + "px",
					"&:hover": {
						backgroundColor: "rgba(255, 25, 25, 0.45)",
					},
				}}
			>
				{isHovering && <RemoveCircleOutlineIcon size="sm" />}
				{!isHovering && <Typography variant="body1">{props.model}</Typography>}
			</Paper>
		</Tooltip>
	);
};

export default JobModels;
