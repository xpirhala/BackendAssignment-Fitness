import { TrackingExerciseDbService } from "../db/services/trackingExerciseDbService";
const trackingExerciseDbService = new TrackingExerciseDbService();


export class TrackingExerciseService {
    // Implement tracking-related logic here
    getCompletedExercises(userId: number): any {
        // Logic to get completed exercises for a user
        let result;
        try{
            result = trackingExerciseDbService.getCompleteTrackingExercises(userId);
        } catch (error) {
            throw new Error('Error fetching completed exercises');
        }
        return { result };
    }

    getIncompleteExercises(userId: number): any {
        // Logic to get incomplete exercises for a user
        let result;
        try{
            result = trackingExerciseDbService.getIncompleteTrackingExercises(userId);
        } catch (error) {
            throw new Error('Error fetching incomplete exercises');
        }
        return { result };
    }

    getAllExercises(userId: number): any {
        let result;
        try{
            result = trackingExerciseDbService.getAllTrackingExercises(userId);
        } catch (error) {
            throw new Error('Error fetching all exercises');
        }
        return { result };
    }

    

    markExerciseComplete(userId: number, trackingExerciseId: number): any {
        // Logic to mark an exercise as complete for a user
        let result
        try{
            result = trackingExerciseDbService.markExerciseComplete(userId, trackingExerciseId);
        } catch (error) {
            throw new Error('Error marking completed exercises');
        }
        return { result };
    }

    markExerciseIncomplete(userId: number, trackingExerciseId: number): any {
        // Logic to mark an exercise as incomplete for a user
        let result
        try{
            result = trackingExerciseDbService.markExerciseIncomplete(userId, trackingExerciseId);
        } catch (error) {
            throw new Error('Error marking incomplete exercises');
        }
        return { result };
    }





    createExercise(userId: number, exerciseData: any): any {
        // Logic to add a new exercise for a user
        let result
        exerciseData.userId = userId; // associate exercise with user
        try{
            result = trackingExerciseDbService.createTrackingExercise( exerciseData);
        } catch (error) {
            throw new Error('Error adding exercise');
        }
        return { result };
    }

    removeExercise(userId: number, trackingExerciseId: number): any {
        // Logic to remove an exercise for a user
        let result
        try{
            result = trackingExerciseDbService.deleteTrackingExercise(userId,trackingExerciseId);
        } catch (error) {
            throw new Error('Error removing exercise');
        }
        return { result };
    }
}