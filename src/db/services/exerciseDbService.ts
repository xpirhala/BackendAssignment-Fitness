import { models } from '../models/index'

const { Exercise, Program } = models

class ExerciseDbService {

    async getAllExercises(): Promise<any> {
        const exercises = await Exercise.findAll({
            include: [{
                model: Program
            }]
        });

        return exercises;
    }

    async createExercise(data: any): Promise<any> {
        const newExercise = await Exercise.create(data);
        return newExercise;
    }

    async updateExercise(id: number, data: any): Promise<any> {
        const exercise = await Exercise.findByPk(id);
        if (exercise) {
            Object.assign(exercise, data);
            await exercise.save();
            return exercise;
        }
        return exercise;
    }

    async deleteExercise(id: number): Promise<any> {
        const deleted = await Exercise.destroy({ where: { id } });
        return deleted;
    }
}

export { ExerciseDbService }
