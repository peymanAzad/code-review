import { BaseEntity } from "./BaseEntity";

export interface Profile extends BaseEntity {
	name: string;
	nickname: string;
	email: string;
	capital: number;
	divisa: string;
	prefered_cryptocurrency: string;
}
