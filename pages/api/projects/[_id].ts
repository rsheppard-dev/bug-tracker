// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '../../../db/mongoose';
import Project from '../../../models/Project';

export default async function project(
	req: NextApiRequest,
	res: NextApiResponse
) {
	await connectMongo();

	const { _id } = req.query;

	// get a specific project by its id

	if (req.method === 'GET') {
		try {
			const project = await Project.findById(_id);

			if (!project) {
				return res.status(404).json({});
			}

			res.status(200).json(project);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}

	// update a specific project by its id

	if (req.method === 'PATCH') {
		const updates = Object.keys(req.body);
		const allowedUpdates = ['projectName', 'description'];
		const isValidOperation = updates.every(update =>
			allowedUpdates.includes(update)
		);

		if (!isValidOperation) {
			return res.status(400).json({ error: 'Invalid updates!' });
		}

		try {
			const project = await Project.findById(_id);

			updates.forEach(update => (project[update] = req.body[update]));
			await project.save();

			if (!project) {
				return res.status(404).json({});
			}

			res.status(200).json(project);
		} catch (error) {
			console.log(error);
			res.status(400).json(error);
		}
	}

	// delete a specific project by its id

	if (req.method === 'DELETE') {
		try {
			const project = await Project.findByIdAndDelete(_id);

			if (!project) {
				return res.status(404).json({});
			}

			res.status(200).json(project);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
}
