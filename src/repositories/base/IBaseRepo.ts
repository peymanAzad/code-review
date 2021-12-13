import { Filter, OptionalId, WithId } from "mongodb";
import { BaseEntity } from "../../entities/BaseEntity";

export interface IBaseRepository<T extends BaseEntity> {
	getById(id: string): Promise<WithId<T> | null>;

	get(): Promise<WithId<T>[]>;

	insert(entity: OptionalId<T>): Promise<WithId<T>>;

	findOne(query: Filter<T>): Promise<WithId<T> | null>;
}
