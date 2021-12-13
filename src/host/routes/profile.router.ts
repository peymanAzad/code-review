import express from "express";
import { IProfileService } from "../../services/profile/IProfileService";
import { cursorSchema } from "../schemas/cursor.schema";
import { profileSchema } from "../schemas/profile.schema";
import { createError, toErrorResponse } from "../utils/errorMap";
import * as yup from "yup";

const router = express.Router();

const createRoutes = (profileService: IProfileService) => {
	router.get("/api/profile", async (req, res) => {
		try {
			const { limit, cursorId } = await cursorSchema.validate(req.query, {
				abortEarly: false,
			});
			const result = await profileService.get(limit, cursorId);
			return res.json(result);
		} catch (error) {
			if (error instanceof yup.ValidationError)
				return res.send(toErrorResponse(error));
			else {
				console.log(error);
				return res.sendStatus(500);
			}
		}
	});

	router.post("/api/profile", async (req, res) => {
		try {
			const profileInput = await profileSchema.validate(req.body, {
				abortEarly: false,
			});
			const profile = await profileService.insert(profileInput);
			return res.json(profile);
		} catch (err) {
			if (err.message === "Duplicate Key") {
				return res
					.status(400)
					.send(createError(`${err.field} Already exist`, err.field));
			} else if (err instanceof yup.ValidationError)
				return res.status(400).send(toErrorResponse(err));
			else return res.sendStatus(500);
		}
	});
	return router;
};

export default createRoutes;
