import { Db, MongoClient } from "mongodb";
import request from "supertest";
import createApp from "../src/host/app";
import { Express } from "express";
import { Server } from "http";
import { InsertEntity } from "../src/entities/BaseEntity";
import { Profile } from "../src/entities/Profile";
import { seed } from "./seed";

let mongoClient: MongoClient;
let db: Db;
let app: Express;
let server: Server;

let profile_id: string;

beforeAll(async () => {
	mongoClient = new MongoClient((global as any).MONGOURL);
	await mongoClient.connect();
	db = mongoClient.db();
	await seed(db);
	app = await createApp(db);
	const port = (global as any).PORT;
	server = app.listen(port as string, () =>
		console.log(`✅  Ready on port http://localhost:${port}`)
	);
});

afterAll(async () => {
	await db.dropDatabase();
	await server.close();
	await mongoClient.close();
});

describe("profile testing", () => {
	it("should get all profiles", async () => {
		const { body } = await request(app)
			.get("/api/profile")
			.query({ limit: 2 })
			.expect(200)
			.expect("Content-Type", /json/);

		expect(body.results.length).toBe(2);
		expect(body.hasMore).toBe(false);
	});
	it("should insert new profile", async () => {
		const profileInput: InsertEntity<Profile> = {
			name: "test profile",
			email: "test@test.com",
			capital: 1,
			divisa: "test divisa",
			nickname: "test nickname",
			prefered_cryptocurrency: "test currency",
		};

		const response = await request(app)
			.post("/api/profile")
			.send(profileInput)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200);

		profile_id = response.body._id as string;
		expect(response.body.email).toBe(profileInput.email);
		expect(response.body.name).toBe(profileInput.name);
	});
});

describe("favorite testing", () => {
	it("should get all favorite", async () => {
		const { body } = await request(app)
			.get("/api/favorite")
			.query({ limit: 2 })
			.expect(200)
			.expect("Content-Type", /json/);

		expect(body.results.length).toBe(2);
		expect(body.hasMore).toBe(false);
	});
	it("should get favorite by profile id", async () => {
		await request(app)
			.get("/api/favorite/61b50bcfbdbc444267d8a5dd")
			.expect(404);
	});
});

describe("simulator testing", () => {
	it("should get all simulators", async () => {
		const { body } = await request(app)
			.get("/api/simulator")
			.query({ limit: 2 })
			.expect(200)
			.expect("Content-Type", /json/);

		expect(body.results.length).toBe(2);
		expect(body.hasMore).toBe(false);
	});
	it("should get simulator by profile id", async () => {
		await request(app)
			.get("/api/simulator/61b50bcfbdbc444267d8a5dd")
			.expect(404);
	});
	it("should insert new simulator", async () => {
		const input = {
			cryptocurrency: "test crypto",
			dateRecorded: new Date(),
			euros: 100,
			price: 200,
			quantity: 1,
			profile_id,
		};

		const simulator = await request(app)
			.post(`/api/simulator/${profile_id}`)
			.send(input)
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200);

		expect(simulator.body.cryptocurrency).toBe("test crypto");
	});
});
