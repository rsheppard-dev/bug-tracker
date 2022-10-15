import mongoose, { Schema, model, models } from 'mongoose';

import IProject from '../interfaces/IProject';

// schema
const projectSchema = new Schema<IProject>(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		projectManager: {
			type: mongoose.Schema.Types.ObjectId,
		},
		developers: {
			type: [mongoose.Schema.Types.ObjectId],
		},
		submitters: {
			type: [mongoose.Schema.Types.ObjectId],
		},
		tickets: {
			type: [mongoose.Schema.Types.ObjectId],
		},
		deadline: {
			type: Date,
		},
		archived: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// model
const Project = models.Project || model<IProject>('Project', projectSchema);

export default Project;
