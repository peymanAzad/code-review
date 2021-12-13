import { Db, MongoServerError, ObjectId, OptionalId } from "mongodb";
import { WithCursor } from "src/entities/BaseEntity";
import { Profile } from "../../entities/Profile";
import { BaseRepository } from "../base/baseRepo";
import { IProfileRepository } from "./IProfileReop";

export class ProfileRepository
	extends BaseRepository<Profile>
	implements IProfileRepository
{
	constructor(db: Db, collectionName: string) {
		super(db, collectionName);
	}

	async insert(profileInput: OptionalId<Profile>) {
		try {
			const { insertedId } = await this.collection.insertOne(profileInput);
			return { ...profileInput, _id: insertedId };
		} catch (error) {
			if (error instanceof MongoServerError) {
				if (error.code === 11000) {
					throw {
						field: Object.keys(error.keyValue)[0],
						message: "Duplicate Key",
					};
				}
			}
			throw error;
		}
	}
	async getWithCursor(
		limit: number,
		cursorId?: string
	): Promise<WithCursor<Profile>> {
		const query = cursorId ? { _id: { $lt: new ObjectId(cursorId) } } : {};
		const results = await this.collection
			.find(query)
			.sort({ _id: -1 })
			.limit(limit + 1)
			.toArray();
		const hasMore = results.length === limit + 1;
		if (hasMore) results.splice(limit, 1);
		return {
			results,
			hasMore,
		};
	}
}
