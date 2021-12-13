import { Db, ObjectId } from "mongodb";
import { WithCursor } from "src/entities/BaseEntity";
import { Favorite } from "../../entities/Favorite";
import { BaseRepository } from "../base/baseRepo";
import { IFavoriteRepository } from "./IFavoriteRepo";

export class FavoriteRepository
	extends BaseRepository<Favorite>
	implements IFavoriteRepository
{
	constructor(db: Db, collectionName: string) {
		super(db, collectionName);
	}
	getByProfileId(profileId: string) {
		return super.findOne({ profile_id: new ObjectId(profileId) });
	}

	async getWithCursor(
		limit: number,
		cursorId?: string
	): Promise<WithCursor<Favorite>> {
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
