import { Types } from 'mongoose';

export default interface IProject {
	title: string;
	description: string;
	owner: Types.ObjectId;
	projectManager: Types.ObjectId;
	developers: [Types.ObjectId];
	submitters: [Types.ObjectId];
	tickets: [Types.ObjectId];
	createdAt: Date;
	deadline: Date;
	archived: boolean;
}
