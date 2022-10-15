import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';

const logoutAll = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	try {
		req.user.tokens = [];

		await req.user.save();

		res.status(200).json({});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default logoutAll;
