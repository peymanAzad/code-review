import { InsertEntity, WithID } from "../../entities/BaseEntity";
import { Simulator } from "../../entities/Simulator";
import { ISimulatorRepository } from "../../repositories/simulator/ISimulatorRepo";
import { ISimulatorService } from "./ISimulatorService";

export class SimulatorService implements ISimulatorService {
	constructor(private simulatorRepo: ISimulatorRepository) {}
	get(limit: number, corsorId?: string) {
		return this.simulatorRepo.getWithCursor(limit, corsorId);
	}
	async getByProfileId(profileId: string): Promise<WithID<Simulator>> {
		const simulator = await this.simulatorRepo.getByProfileId(profileId);
		if (!simulator) throw new Error("Not Found");
		return simulator;
	}
	insert(simulator: InsertEntity<Simulator>): Promise<WithID<Simulator>> {
		return this.simulatorRepo.insert({
			...simulator,
			createdDate: new Date(),
			updatedDate: new Date(),
			_v: 1,
		});
	}
}
