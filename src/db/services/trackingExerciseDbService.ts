import { models } from '../models/index'

const { TrackingExercise } = models

class TrackingExerciseDbService {
    async getAllTrackingExercises(): Promise<any> {
        const trackingExercises = await TrackingExercise.findAll();
        return trackingExercises;
    }

    async getTrackingExerciseById(id: number): Promise<any> {
        const trackingExercise = await TrackingExercise.findByPk(id);
        return trackingExercise;
    }

    async createTrackingExercise(data: any): Promise<any> {
        const newTrackingExercise = await TrackingExercise.create(data);
        return newTrackingExercise;
    }

    async updateTrackingExercise(id: number, data: any): Promise<any> {
        const trackingExercise = await TrackingExercise.findByPk(id);
        if (trackingExercise) {
            Object.assign(trackingExercise, data);
            await trackingExercise.save();
            return trackingExercise;
        }
        return null;
    }

    async deleteTrackingExercise(id: number): Promise<boolean> {
        const deletedCount = await TrackingExercise.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

export { TrackingExerciseDbService }
