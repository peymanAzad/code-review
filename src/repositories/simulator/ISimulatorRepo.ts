import { WithId } from "mongodb";
import { WithCursor } from "src/entities/BaseEntity";
import { Simulator } from "../../entities/Simulator";

export interface ISimulatorRepository {
	get(): Promise<WithId<Simulator>[]>;
	getByProfileId(profileId: string): Promise<WithId<Simulator> | null>;
	insert(simulator: Simulator): Promise<WithId<Simulator>>;
	getWithCursor(
		limit: number,
		cursorId?: string
	): Promise<WithCursor<Simulator>>;
}
