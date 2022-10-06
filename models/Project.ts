import { Schema, model, models } from 'mongoose';

import IProject from '../interfaces/IProject';

// schema
const projectSchema = new Schema<IProject>({
	projectName: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// model
const Project = models.Project || model<IProject>('Project', projectSchema);

export default Project;
