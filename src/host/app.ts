import { Db } from "mongodb";
import express from "express";
import { CORS_ORIGINS } from "../config";
import cors from "cors";
import bodyParser from "body-parser";
import favoriteRouter from "./routes/favorite.router";
import profileRouter from "./routes/profile.router";
import simulatorRouter from "./routes/simulator.router";
import { FavoriteRepository } from "../repositories/favorite/favoriteRepo";
import { ProfileRepository } from "../repositories/profile/profileRepo";
import { SimulatorRepository } from "../repositories/simulator/simulatorRepo";
import { FavoriteService } from "../services/favorite/favoriteService";
import { SimulatorService } from "../services/simulator/simulatorService";
import { ProfileService } from "../services/profile/profileService";

const createApp = async (db: Db) => {
	await db.collection("profile").createIndex("nickname", { unique: true });
	await db.collection("profile").createIndex("email", { unique: true });

	const favoriteRepo = new FavoriteRepository(db, "favorite");
	const profileRepo = new ProfileRepository(db, "profile");
	const simulatorRepo = new SimulatorRepository(db, "simulator");

	const favoriteService = new FavoriteService(favoriteRepo);
	const profileService = new ProfileService(profileRepo);
	const simulatorService = new SimulatorService(simulatorRepo);

	const app = express();

	app.use(cors({ origin: CORS_ORIGINS }));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.use(favoriteRouter(favoriteService));
	app.use(profileRouter(profileService));
	app.use(simulatorRouter(simulatorService, profileService));

	return app;
};

export default createApp;
