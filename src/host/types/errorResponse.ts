export interface ErrorElement {
	field: string;
	message: string;
}

export interface ErrorResponse {
	errors?: ErrorElement[];
}
