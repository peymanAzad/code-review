import { ObjectId } from "mongodb";
import { BaseEntity } from "./BaseEntity";

export interface Favorite extends BaseEntity {
	profile_id: ObjectId;
	name: string;
	favorite1: string;
	favorite2: string;
	favorite3: string;
}
