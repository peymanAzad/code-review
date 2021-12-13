/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	globals: {
		MONGOURL: "mongodb://localhost:27017/testApi",
		PORT: "4000",
	},
};
