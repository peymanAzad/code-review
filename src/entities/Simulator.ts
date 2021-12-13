import { ObjectId } from "mongodb";
import { BaseEntity } from "./BaseEntity";

export interface Simulator extends BaseEntity {
	profile_id: ObjectId;
	dateRecorded: Date;
	cryptocurrency: string;
	euros: number;
	price: number;
	quantity: number;
}
