import { InsertEntity, WithID } from "../../entities/BaseEntity";
import { Profile } from "../../entities/Profile";
import { IProfileRepository } from "../../repositories/profile/IProfileReop";
import { IProfileService } from "./IProfileService";

export class ProfileService implements IProfileService {
	constructor(private profileRepo: IProfileRepository) {}
	getById(id: string) {
		return this.profileRepo.getById(id);
	}

	get(limit: number, cursorId?: string) {
		return this.profileRepo.getWithCursor(limit, cursorId);
	}
	insert(profileInput: InsertEntity<Profile>): Promise<WithID<Profile>> {
		return this.profileRepo.insert({
			...profileInput,
			createdDate: new Date(),
			updatedDate: new Date(),
			_v: 1,
		});
	}
}
