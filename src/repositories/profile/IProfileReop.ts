import { OptionalId, WithId } from "mongodb";
import { WithCursor } from "src/entities/BaseEntity";
import { Profile } from "../../entities/Profile";

export interface IProfileRepository {
	get(): Promise<WithId<Profile>[]>;
	getById(id: string): Promise<WithId<Profile> | null>;
	insert(profileInput: OptionalId<Profile>): Promise<WithId<Profile>>;
	getWithCursor(limit: number, cursorId?: string): Promise<WithCursor<Profile>>;
}
