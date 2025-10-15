import { ExerciseDbService } from "../db/services/exerciseDbService";
const exerciseDbService = new ExerciseDbService();

import { iExerciseGetAllService } from "../interfaces/exerciseInterface";

export class ExerciseService {
    // Implement exercise-related logic here

    async getAllExercises(query:any): Promise<iExerciseGetAllService> {
        // Fetch and return all exercises from the database

        const page = parseInt(query.page as string, 10) as number | undefined;
        const limit = parseInt(query.limit as string, 10) as number | undefined;
        const offset = (page - 1) * limit as number | undefined;
        
        const search = query.search as string | undefined; // contains string
        const id = query.id as string | undefined;         // can be comma-separated: "1,3,5"
        
        const allExercises = await exerciseDbService.getAllExercises();
       let filteredExercises = allExercises;
        if (search) {
            // If search parameter is provided, filter exercises by name or description
            
            filteredExercises = allExercises.filter((exercise: any) =>
                exercise.name.toLowerCase().includes(search.toLowerCase()) ||
                (exercise.description && exercise.description.toLowerCase().includes(search.toLowerCase()))
            );
            
        }
        
        if (id) {
            // If id parameter is provided, filter exercises by the given IDs
            const ids = id.split(',').map(idStr => parseInt(idStr, 10));
            
            filteredExercises = allExercises.filter((exercise: any) =>
                ids.includes(parseInt(exercise.id, 10))
            );
        }
    
        if (page &&limit) {
            //@ts-ignore
            const paginatedExercises = filteredExercises.slice(offset, offset + limit);
            return {
                data: paginatedExercises
            };

        }else if(filteredExercises) {
            return {
                data: filteredExercises
            };
        }else{
            return {
                data: allExercises
            };
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