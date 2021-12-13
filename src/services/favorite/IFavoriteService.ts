import { WithCursor, WithID } from "../../entities/BaseEntity";
import { Favorite } from "../../entities/Favorite";

export interface IFavoriteServie {
	get(limit: number, cursorId?: string): Promise<WithCursor<Favorite>>;
	getByProfileId(profileId: string): Promise<WithID<Favorite>>;
}
