import { WithID } from "../../entities/BaseEntity";
import { Favorite } from "../../entities/Favorite";
import { IFavoriteRepository } from "../../repositories/favorite/IFavoriteRepo";
import { IFavoriteServie } from "./IFavoriteService";

export class FavoriteService implements IFavoriteServie {
	constructor(private favoriteRepo: IFavoriteRepository) {}

	async get(limit: number, cursorId?: string) {
		return this.favoriteRepo.getWithCursor(limit, cursorId);
	}
	async getByProfileId(profileId: string): Promise<WithID<Favorite>> {
		const favorite = await this.favoriteRepo.getByProfileId(profileId);
		if (!favorite) throw new Error("Not Found");
		return favorite;
	}
}
