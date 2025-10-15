import { iProgramGetAll } from "./programInterface";

interface iExercise {
	id: number;
    difficulty: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
    programID: number;
}

interface iExerciseGetAll {
    id: number;
    difficulty: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    programID: number;
    program: iProgramGetAll
}

interface iExerciseGetAllService {
    data: iExerciseGetAll[];
}
export { iExerciseGetAll, iExerciseGetAllService };