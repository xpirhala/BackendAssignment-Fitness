import { TrackingExerciseDbService } from "../db/services/trackingExerciseDbService";
const trackingExerciseDbService = new TrackingExerciseDbService();


export class TrackingExerciseService {
    // Implement tracking-related logic here
    async getCompletedExercises(userId: number): Promise<any> {
        // Logic to get completed exercises for a user
        let result;
        try{
            result = await trackingExerciseDbService.getCompleteTrackingExercises(userId);
        } catch (error) {
            throw new Error('Error fetching completed exercises');
        }
        return { result };
    }

    async getIncompleteExercises(userId: number): Promise<any> {
        // Logic to get incomplete exercises for a user
        let result;
        try{
            result = await trackingExerciseDbService.getIncompleteTrackingExercises(userId);
        } catch (error) {
            throw new Error('Error fetching incomplete exercises');
        }
        return { result };
    }

    async getAllExercises(userId: number): Promise<any> {
        let result;
        try{
            result = await trackingExerciseDbService.getAllTrackingExercises(userId);
        } catch (error) {
            throw new Error('Error fetching all exercises');
        }
        return { result };
    }

    

    async markExerciseComplete(userId: number, trackingExerciseId: number): Promise<any> {
        // Logic to mark an exercise as complete for a user
        let result
        try{
            result = await trackingExerciseDbService.markExerciseComplete(userId, trackingExerciseId);
        } catch (error) {
            throw new Error('Error marking completed exercises');
        }
        return { result };
    }

    async markExerciseIncomplete(userId: number, trackingExerciseId: number): Promise<any> {
        // Logic to mark an exercise as incomplete for a user
        let result
        try{
            result = await trackingExerciseDbService.markExerciseIncomplete(userId, trackingExerciseId);
        } catch (error) {
            throw new Error('Error marking incomplete exercises');
        }
        return { result };
    }





    async createExercise(userId: number, exerciseData: any): Promise<any> {
        // Logic to add a new exercise for a user
        let result
        exerciseData.userID = userId; // associate exercise with user
        try{
            result = await trackingExerciseDbService.createTrackingExercise( exerciseData);
        } catch (error) {
            throw new Error('Error adding exercise');
        }
        return { result };
    }

    async removeExercise(userId: number, trackingExerciseId: number): Promise<any> {
        // Logic to remove an exercise for a user
        let result
        try{
            result = await trackingExerciseDbService.deleteTrackingExercise(userId,trackingExerciseId);
        } catch (error) {
            throw new Error('Error removing exercise');
        }
        return { result };
    }
}