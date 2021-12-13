import * as yup from "yup";
import { ErrorResponse } from "../types/errorResponse";

export const toErrorResponse = (
	yupErrors: yup.ValidationError
): ErrorResponse => ({
	errors:
		yupErrors.inner.length > 0
			? yupErrors.inner.map((err) => ({
					field: err.path || "error",
					message: err.message,
			  }))
			: [{ field: yupErrors.path || "error", message: yupErrors.errors[0] }],
});

export const createError = (
	message: string,
	field: string = "error"
): ErrorResponse => ({
	errors: [{ field, message }],
});
