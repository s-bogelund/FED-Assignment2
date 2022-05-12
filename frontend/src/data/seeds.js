export const seedJobs = [
	{
		id: 1,
		modelName: ["Kenneth", "Ulven"],
		customer: "Assos",
		salary: "1200",
	},
	{
		id: 2,
		modelName: ["Grenen"],
		customer: "Gucci",
		salary: "1400",
	},
	{
		id: 3,
		modelName: ["Brian"],
		customer: "Assos",
		salary: "1100",
	},
	{
		id: 4,
		modelName: ["Lars"],
		customer: "Zalando",
		salary: "900",
	},
];

const seedUsers = [
	{
		id: 1,
		name: "Kenneth",
		role: "Model",
		email: "kenneth@jæger.dk",
		password: "123456",
		phone: "12345678",
		address: "Havnevej 1",
	},
	{
		id: 2,
		name: "Grenen",
		role: "Model",
		email: "Grenen@jæger.dk",
		password: "123456",
		phone: "123432148",
		address: "Havnevej 2",
	},
	{
		id: 3,
		name: "Brian",
		role: "Model",
		email: "Brian@jæger.dk",
		password: "123456",
		phone: "12123478",
		address: "Havnevej 3",
	},
	{
		id: 4,
		name: "Lars",
		role: "Model",
		email: "Lars@jæger.dk",
		password: "123456",
		phone: "12123443",
		address: "Havnevej 4",
	},
	{
		id: 5,
		name: "Ulven",
		role: "Model",
		email: "Ulven@jæger.dk",
		password: "123456",
		phone: "12123478",
		address: "Havnevej 5",
	},
	{
		id: 6,
		name: "Carsten",
		role: "Manager",
		email: "carsten@kenneth.dk",
		password: "123456",
		phone: "12376418",
		address: "Havnevej 8",
	},
	{
		id: 7,
		name: "Granaten",
		role: "Manager",
		email: "granaten@bombe.dk",
		password: "123456",
		phone: "12345438",
		address: "Havnevej 18",
	},
];

export const getSeedUsers = (role) => {
	if (role.toLowerCase() === "all") return seedUsers;

	const userSeeds = seedUsers.filter(
		(user) => user.role.toLowerCase() === role.toLowerCase()
	);

	return userSeeds;
};
