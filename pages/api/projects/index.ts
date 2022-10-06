// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '../../../db/mongoose';
import Project from '../../../models/Project';

export default async function projects(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongo();

	// create a new project

	if (req.method === 'POST') {
		try {
			const project = new Project(req.body);
			await project.save();

			res.status(201).json(project);
		} catch (error) {
			console.log(error);
			res.status(400).json(error);
		}
	}

	// get a list of all projects

	if (req.method === 'GET') {
		try {
			const project = await Project.find({});

			res.status(200).json(project);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
}
