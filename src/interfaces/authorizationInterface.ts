interface iExercise {
	id: number;
    difficulty: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
    programID: number;
}