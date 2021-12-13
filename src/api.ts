import { MongoClient } from "mongodb";
import { DBURL, PORT } from "./config";
import createApp from "./host/app";

const main = async () => {
	const mongoClient = new MongoClient(DBURL);
	await mongoClient.connect();
	const db = mongoClient.db("test");
	const app = await createApp(db);

	app.listen(PORT, () =>
		console.log(`✅  Ready on port http://localhost:${PORT}`)
	);
};

main();
