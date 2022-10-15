import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';
import Project from '../../models/Project';

const getProject = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	const { _id } = req.query;

	try {
		const project = await Project.findOne({ _id, owner: req.user._id });

		if (!project) {
			res.status(404).json({});
		}

		res.status(200).json(project);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default getProject;
