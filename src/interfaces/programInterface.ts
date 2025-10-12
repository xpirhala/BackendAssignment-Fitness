interface iProgramGetAll {
	id: number;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

interface iProgramGetAllService {
    data: iProgramGetAll[];
    message: string;
}
export { iProgramGetAll, iProgramGetAllService };