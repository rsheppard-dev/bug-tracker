import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';
import Match from '../../interfaces/Match';
import Sort from '../../interfaces/Sort';

const getAllProjects = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	const match: Match = {};
	const sort: Sort = {};

	// filter options
	if (req.query.archived) {
		match.archived = req.query.archived === 'true' ? true : false;
	}

	if (req.query.sortBy) {
		const parts: (string | number)[] = (req.query.sortBy as string).split(':');
		sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
	}

	try {
		await req.user.populate({
			path: 'projects',
			match,
			options: {
				limit: Number(req.query.limit),
				skip: Number(req.query.skip),
				sort,
			},
		});

		res.status(200).json(req.user.projects);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default getAllProjects;
