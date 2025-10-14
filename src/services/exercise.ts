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

    async createExercise(data: any): Promise<any> {
        // Create a new exercise in the database
        const newExercise = await exerciseDbService.createExercise(data);
        return newExercise;
    }

    async updateExercise(id: number, data: any): Promise<any> {
        // Update an existing exercise in the database
        const result = await exerciseDbService.updateExercise(id, data);
        if (!result) {
            throw new Error('Exercise not found');
        }
        return result;
    }

    async deleteExercise(id: number): Promise<any> {
        // Delete an exercise from the database
        const result = await exerciseDbService.deleteExercise(id);
        if (!result) {
            throw new Error('Exercise not found or could not be deleted');
        }
        return result;
    }   
}