import { ProgramDbService } from "../db/services/programDbService"
import { iProgramGetAllService } from "../interfaces/programInterface";
const programDbService = new ProgramDbService();


export class ProgramService {
    // Implement program-related logic here
    async getAllPrograms(): Promise<iProgramGetAllService> {
        // Fetch and return all programs from the database
        const programs = await programDbService.getAllPrograms();
		return {
			data: programs,
			message: 'List of programs'
		}
    }
}   