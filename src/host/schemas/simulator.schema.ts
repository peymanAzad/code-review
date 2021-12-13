import * as yup from "yup";

export const simulatorSchema = yup.object().shape({
	profile_id: yup.string().required().trim(),
	dateRecorded: yup.date().required(),
	cryptocurrency: yup.string().required().trim(),
	euros: yup.number().required(),
	price: yup.number().required(),
	quantity: yup.number().positive().required(),
});
