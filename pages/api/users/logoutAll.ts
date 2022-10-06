// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import logoutAll from '../../../apis/logoutAll';
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

	return logoutAll(req, res);
}
