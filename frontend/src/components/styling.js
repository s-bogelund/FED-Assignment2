export const containerStyle = {
	display: "flex",
	flexDirection: "column",
	margin: 2,
	py: 1,
	border: "2px solid rgba(160, 160, 160, 0.3)",
	borderRadius: 4,
	boxShadow: "0 0 9px rgba(120, 120, 120, 0.15)",
	backgroundColor: "#1f2b3755",
};

export const bodyContainer = {
	margin: 0,
	marginTop: 0,
	pt: 5,
	px: 2,
	background:
		"linear-gradient(186deg, rgba(10,25,41,0.85) 0%, rgba(10,25,41,0.5) 65%, rgba(10,25,41,0.3) 100%)",
	minWidth: "100vw",
	minHeight: "100vh",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const largeBoxStyle = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	my: 11,
	py: 6,
	px: 7,
	backgroundColor: "#001e3c100",
	borderRadius: 4,
	boxShadow: "0 0 9px rgba(120, 120, 120, 0.15)",
};

export const hoverEffect = {
	transition: "all 0.15s ease-in-out",
	"&:hover": {
		transform: "scale(1.05)",
		boxShadow: "0px 0px 12px rgba(255, 255, 255, 0.25)",
	},
};
