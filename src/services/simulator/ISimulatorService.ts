import { InsertEntity, WithCursor, WithID } from "../../entities/BaseEntity";
import { Simulator } from "../../entities/Simulator";

export interface ISimulatorService {
	get(limit: number, cursorId?: string): Promise<WithCursor<Simulator>>;
	getByProfileId(profileId: string): Promise<WithID<Simulator>>;
	insert(simulator: InsertEntity<Simulator>): Promise<WithID<Simulator>>;
}
