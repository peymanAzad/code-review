import { MongoClient } from "mongodb";
import { Favorite } from "../entities/Favorite";
import { Profile } from "../entities/Profile";
import { Simulator } from "../entities/Simulator";
import { DBURL } from "../config";

(async () => {
	const mongoClient = new MongoClient(DBURL);
	await mongoClient.connect();
	const db = mongoClient.db("test");

	const profileCollection = db.collection<Profile>("profile");
	const favoriteCollection = db.collection<Favorite>("favorite");
	const simulatorCollection = db.collection<Simulator>("simulator");

	const profile = await profileCollection.insertOne({
		name: `String`,
		email: `String`,
		nickname: "string",
		capital: 123,
		divisa: `String`,
		prefered_cryptocurrency: `String`,
		createdDate: new Date(),
		updatedDate: new Date(),
		_v: 1,
	});

	const idProfile = profile.insertedId;

	await simulatorCollection.insertOne({
		profile_id: idProfile,
		createdDate: new Date(`01/05/2021`),
		updatedDate: new Date(`01/05/2021`),
		cryptocurrency: `String`,
		_v: 1,
		dateRecorded: new Date(),
		euros: 123,
		price: 123,
		quantity: 1,
	});

	await favoriteCollection.insertOne({
		profile_id: idProfile,
		name: `String`,
		favorite1: `String`,
		favorite2: `String`,
		favorite3: `String`,
		_v: 1,
		createdDate: new Date(),
		updatedDate: new Date(),
	});

	await mongoClient.close();
})();
