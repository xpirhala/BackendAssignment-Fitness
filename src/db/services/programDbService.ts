import { models } from '../index'

const { Exercise, Program } = models


export class ProgramDbService {
    // Implement program-related database operations here
    async getAllPrograms(): Promise<any> {
        // Fetch and return all programs from the database
        return await Program.findAll()
    }
}