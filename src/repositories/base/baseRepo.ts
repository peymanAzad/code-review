import { Collection, Db, Filter, ObjectId, OptionalId } from "mongodb";
import { BaseEntity } from "../../entities/BaseEntity";
import { IBaseRepository } from "./IBaseRepo";

export abstract class BaseRepository<T extends BaseEntity>
	implements IBaseRepository<T>
{
	protected collection: Collection<T>;
	constructor(protected db: Db, collectionName: string) {
		this.collection = db.collection<T>(collectionName);
	}

	getById(id: string) {
		return this.collection.findOne({ _id: new ObjectId(id) });
	}

	get() {
		return this.collection.find().toArray();
	}

	async insert(entity: OptionalId<T>) {
		const result = await this.collection.insertOne(entity);
		return { ...entity, _id: result.insertedId };
	}

	findOne(query: Filter<T>) {
		return this.collection.findOne(query);
	}
}
