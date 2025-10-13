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
}

export { ExerciseDbService }
