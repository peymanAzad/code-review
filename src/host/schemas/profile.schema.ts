import * as yup from "yup";

export const profileSchema = yup.object().shape({
	name: yup.string().required().trim(),
	nickname: yup.string().required().trim(),
	email: yup.string().email().required(),
	capital: yup.number().required(),
	divisa: yup.string().required().trim(),
	prefered_cryptocurrency: yup.string().required().trim(),
});
