import { Db, ObjectId } from "mongodb";
import { WithCursor } from "src/entities/BaseEntity";
import { Simulator } from "../../entities/Simulator";
import { BaseRepository } from "../base/baseRepo";
import { ISimulatorRepository } from "./ISimulatorRepo";

export class SimulatorRepository
	extends BaseRepository<Simulator>
	implements ISimulatorRepository
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
	): Promise<WithCursor<Simulator>> {
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
