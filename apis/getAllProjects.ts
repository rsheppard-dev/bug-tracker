import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';
import Project from '../models/Project';

const getAllProjects = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		await req.user.populate('projects');

		res.status(200).json(req.user.projects);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default withProtect(getAllProjects);
