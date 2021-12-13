import express from "express";
import * as yup from "yup";
import { IFavoriteServie } from "../../services/favorite/IFavoriteService";
import { cursorSchema } from "../schemas/cursor.schema";
import { toErrorResponse } from "../utils/errorMap";
const router = express.Router();

const createRoutes = (favoriteService: IFavoriteServie) => {
	router.get("/api/favorite", async (req, res) => {
		try {
			const { limit, cursorId } = await cursorSchema.validate(req.query, {
				abortEarly: false,
			});
			const result = await favoriteService.get(limit, cursorId);
			return res.json(result);
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				return res.send(toErrorResponse(error));
			} else {
				console.log(error);
				return res.sendStatus(500);
			}
		}
	});

	router.get("/api/favorite/:profile_id", async (req, res) => {
		let query = {};
		const { profile_id } = req.params;
		query = { profile_id };
		console.log(query);
		try {
			const data = await favoriteService.getByProfileId(profile_id);
			res.json(data);
		} catch (error) {
			if (error.message === "Not Found") {
				res.sendStatus(404);
			} else {
				res.sendStatus(500);
			}
		}
	});
	return router;
};

export default createRoutes;
