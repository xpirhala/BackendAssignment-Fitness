import { ExerciseDbService } from "../db/services/exerciseDbService";
const exerciseDbService = new ExerciseDbService();

import { iExerciseGetAllService } from "../interfaces/exerciseInterface";

export class ExerciseService {
    // Implement exercise-related logic here

    async getAllExercises(): Promise<iExerciseGetAllService> {
        // Fetch and return all exercises from the database
        const exercises = await exerciseDbService.getAllExercises();

		return {
			data: exercises,
			message: 'List of exercises'
		}
        
    }
}