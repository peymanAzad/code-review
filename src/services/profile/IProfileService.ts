import { InsertEntity, WithCursor, WithID } from "../../entities/BaseEntity";
import { Profile } from "../../entities/Profile";

export interface IProfileService {
	get(limit: number, cursorId?: string): Promise<WithCursor<Profile>>;
	getById(id: string): Promise<WithID<Profile> | null>;
	insert(profileInput: InsertEntity<Profile>): Promise<WithID<Profile>>;
}
