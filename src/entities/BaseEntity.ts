import { ObjectId } from "mongodb";

export interface BaseEntity {
	createdDate: Date;
	updatedDate: Date;
	_v: number;
}

export type WithID<T> = T & { _id: ObjectId };

export type InsertEntity<T extends BaseEntity> = Omit<
	T,
	"createdDate" | "updatedDate" | "_v"
>;

export type WithCursor<T> = { results: WithID<T>[]; hasMore: boolean };
