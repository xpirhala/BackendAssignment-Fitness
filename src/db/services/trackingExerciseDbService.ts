import { models } from '../models/index'
import { Op, WhereOptions } from 'sequelize';

const { TrackingExercise } = models

class TrackingExerciseDbService {
    
    async getCompleteTrackingExercises(userId:number): Promise<any> {
        const where: WhereOptions = { userID: userId, completedAt: { [Op.not]: null }, validity: true , deletedAt: { [Op.is]: null }};
        const trackingExercises = await TrackingExercise.findAll({ where: where });
        return trackingExercises;
    }

    async getIncompleteTrackingExercises(userId:number): Promise<any> {
        const where: WhereOptions = { userID: userId, completedAt: { [Op.is]: null }, deletedAt: { [Op.is]: null }};
        const trackingExercises = await TrackingExercise.findAll({ where: where });
        return trackingExercises;
    }
    
    async getAllTrackingExercises(userId:number): Promise<any> {
        const where: WhereOptions = { userID: userId, validity: true };
        const trackingExercises = await TrackingExercise.findAll({ where: where });
        return trackingExercises;
    }

    async markExerciseComplete(userId: number, trackingExerciseId: number): Promise<any> { 
        const where: WhereOptions = { id: trackingExerciseId, userID: userId, validity: true , deletedAt: { [Op.is]: null }};
        const trackingExercise = await TrackingExercise.findOne({ where: where });
        if (trackingExercise) {
            trackingExercise.completedAt = new Date();
            //@ts-ignore
            trackingExercise.durationSeconds = Math.floor((trackingExercise.completedAt.getTime() - trackingExercise.createdAt.getTime()) / 1000);
            await trackingExercise.save();
            return trackingExercise;
        }
        return trackingExercise;
    }

    async markExerciseIncomplete(userId: number, trackingExerciseId: number): Promise<any> {
        const where: WhereOptions = { id: trackingExerciseId, userID: userId, validity: true , deletedAt: { [Op.is]: null }};
        const trackingExercise = await TrackingExercise.findOne({ where: where });
        if (trackingExercise) {
            trackingExercise.completedAt = null;
            trackingExercise.durationSeconds = null;
            await trackingExercise.save();
            return trackingExercise;
        }
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

    async deleteTrackingExercise(userId: number, trackingExerciseId: number): Promise<any> {
        const where: WhereOptions = { id: trackingExerciseId, userId: userId, validity: true , deletedAt: { [Op.is]: null }};
        const trackingExercise = await TrackingExercise.findOne({ where: where });
        if (trackingExercise) {
            //@ts-ignore
            trackingExercise.deletedAt = new Date();
            await trackingExercise.save();
            return trackingExercise;
        }else{
            throw new Error('Tracking exercise not found');
        }
    }
}

export { TrackingExerciseDbService }
