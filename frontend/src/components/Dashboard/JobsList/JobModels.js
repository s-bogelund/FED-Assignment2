import { Paper, Tooltip, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AuthContext from "../../../store/auth-context";

const JobModels = (props) => {
	const [isHovering, setIsHovering] = useState(false);
	const [modelName, setModelName] = useState(
		props.model.firstName + " " + props.model.lastName
	);
	const ctx = useContext(AuthContext);
	const isManager = ctx.loginState.isManager;

	const paperStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.03)",
		borderRadius: 1,
		border: "1px solid rgba(0, 0, 0, 0.52)",
		px: 0.25,
		height: "2rem",
		m: 0.25,
	};

	return (
		<React.Fragment>
			{isManager && (
				<Tooltip title="Click to remove" placement="right">
					<Paper
						onMouseEnter={() => setIsHovering(true)}
						onMouseLeave={() => setIsHovering(false)}
						onClick={() => props.onDelete(props.model.email)}
						sx={{
							...paperStyle,
							cursor: "pointer",
							minWidth: "10rem",
							"&:hover": {
								backgroundColor: "rgba(255, 25, 25, 0.45)",
							},
						}}
					>
						{isHovering && <RemoveCircleOutlineIcon size="sm" />}
						{!isHovering && (
							<Typography variant="body1">{modelName}</Typography>
						)}
					</Paper>
				</Tooltip>
			)}
			{!isManager && (
				<Tooltip title="Models assigned to this job" placement="top">
					<Paper
						sx={{
							...paperStyle,
							cursor: "pointer",
							width: modelName.length * 12 + "px",
						}}
					>
						<Typography variant="body1">{modelName}</Typography>
					</Paper>
				</Tooltip>
			)}
		</React.Fragment>
	);
};

export default JobModels;
