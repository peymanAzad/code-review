import * as yup from "yup";

export const cursorSchema = yup.object().shape({
	limit: yup.number().positive().min(1).max(20).required(),
	cursorId: yup.string().optional(),
});
