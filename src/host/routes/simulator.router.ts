import express from "express";
import { ObjectId } from "mongodb";
import { IProfileService } from "src/services/profile/IProfileService";
import * as yup from "yup";
import { ISimulatorService } from "../../services/simulator/ISimulatorService";
import { cursorSchema } from "../schemas/cursor.schema";
import { simulatorSchema } from "../schemas/simulator.schema";
import { createError, toErrorResponse } from "../utils/errorMap";

export const router = express.Router();

const createRoutes = (
	simulatorService: ISimulatorService,
	profileService: IProfileService
) => {
	router.get("/api/simulator", async (req, res) => {
		try {
			const { limit, cursorId } = await cursorSchema.validate(req.query, {
				abortEarly: false,
			});
			const result = await simulatorService.get(limit, cursorId);
			return res.json(result);
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				return res.send(toErrorResponse(error));
			} else {
				console.log(error);
				return res.end(error.message);
			}
		}
	});

	router.get("/api/simulator/:profile_id", async (req, res) => {
		var { profile_id } = req.params;
		try {
			var data = await simulatorService.getByProfileId(profile_id);
			res.json(data);
		} catch (error) {
			if (error.message === "Not Found") {
				res.sendStatus(404);
			} else {
				console.log(error);
				res.sendStatus(500);
			}
		}
	});

	router.post("/api/simulator/:profile_id", async (req, res) => {
		try {
			const { profile_id } = req.params;
			const profile = await profileService.getById(profile_id);
			if (!profile) {
				return res.send(createError("Profile Not Found", "profile_id"));
			}
			const simulatorInput = await simulatorSchema.validate(
				{
					...req.body,
					profile_id,
				},
				{ abortEarly: false }
			);
			const simulator = await simulatorService.insert({
				...simulatorInput,
				profile_id: new ObjectId(simulatorInput.profile_id),
			});
			return res.json(simulator);
		} catch (error) {
			if (error instanceof yup.ValidationError)
				return res.send(toErrorResponse(error));
			else {
				console.log(error);
				return res.sendStatus(500);
			}
		}
	});

	return router;
};

export default createRoutes;
