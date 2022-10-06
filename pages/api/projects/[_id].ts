// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import getProject from '../../../apis/getProject';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../db/mongoose';
import updateProject from '../../../apis/updateProject';
import deleteProject from '../../../apis/deleteProject';

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
		case 'GET':
			return getProject(req, res);
		case 'PATCH':
			return updateProject(req, res);
		case 'DELETE':
			return deleteProject(req, res);
		default:
			break;
	}
}
