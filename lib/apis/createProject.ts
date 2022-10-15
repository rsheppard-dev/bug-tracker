import { NextApiResponse } from 'next';

import Project from '../../models/Project';
import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';

const createProject = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		const project = new Project({
			...req.body,
			owner: req.user._id,
		});
		await project.save();

		res.status(201).json(project);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

export default createProject;
