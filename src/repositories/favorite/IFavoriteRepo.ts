import { WithId } from "mongodb";
import { WithCursor } from "src/entities/BaseEntity";
import { Favorite } from "../../entities/Favorite";

export interface IFavoriteRepository {
	get(): Promise<WithId<Favorite>[]>;
	getByProfileId(profileId: string): Promise<WithId<Favorite> | null>;
	getWithCursor(
		limit: number,
		cursorId?: string
	): Promise<WithCursor<Favorite>>;
}
