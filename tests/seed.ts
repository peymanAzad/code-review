import { Db, ObjectId } from "mongodb";
import { Favorite } from "../src/entities/Favorite";
import { Profile } from "../src/entities/Profile";
import { Simulator } from "../src/entities/Simulator";

export const seed = async (db: Db) => {
	await db.collection<Profile>("profile").insertMany([
		{
			nickname: "test1",
			email: "test1@test.com",
			divisa: "test devisa",
			capital: 123,
			name: "test",
			_v: 1,
			createdDate: new Date(),
			updatedDate: new Date(),
			prefered_cryptocurrency: "test prefered",
			_id: new ObjectId(),
		},
		{
			nickname: "test2",
			email: "test2@test.com",
			divisa: "test devisa",
			capital: 123,
			name: "test",
			_v: 1,
			createdDate: new Date(),
			updatedDate: new Date(),
			prefered_cryptocurrency: "test prefered",
			_id: new ObjectId(),
		},
	]);
	const profile = await db
		.collection<Profile>("profile")
		.findOne({ nickname: "test1" });
	if (!profile) throw new Error("can't find inserted profile");

	await db.collection<Favorite>("favorite").insertMany([
		{
			name: "favorite1",
			favorite1: "test",
			favorite2: "test2",
			favorite3: "test3",
			_v: 1,
			createdDate: new Date(),
			updatedDate: new Date(),
			profile_id: profile._id,
		},
		{
			name: "favorite2",
			favorite1: "test",
			favorite2: "test2",
			favorite3: "test3",
			_v: 1,
			createdDate: new Date(),
			updatedDate: new Date(),
			profile_id: profile._id,
		},
	]);

	await db.collection<Simulator>("simulator").insertMany([
		{
			dateRecorded: new Date(),
			euros: 100,
			price: 100,
			quantity: 10,
			profile_id: profile._id,
			cryptocurrency: "test crypto",
			createdDate: new Date(),
			updatedDate: new Date(),
			_v: 1,
		},
		{
			dateRecorded: new Date(),
			euros: 200,
			price: 200,
			quantity: 20,
			profile_id: profile._id,
			cryptocurrency: "test crypto",
			createdDate: new Date(),
			updatedDate: new Date(),
			_v: 1,
		},
	]);
};
