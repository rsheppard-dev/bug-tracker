import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';

const logoutAll = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	try {
		req.user.tokens = [];

		await req.user.save();

		return res.status(200).json({});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export default withProtect(logoutAll);
