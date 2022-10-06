// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import createProject from '../../../apis/createProject';
import GetAllProjects from '../../../apis/GetAllProjects';
import connectMongo from '../../../db/mongoose';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';

export default async function handler(
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) {
	try {
		await connectMongo();
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}

	switch (req.method) {
		case 'POST':
			return createProject(req, res);
		case 'GET':
			return GetAllProjects(req, res);
		default:
			break;
	}
}
