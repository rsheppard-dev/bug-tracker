import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';

const getProfile = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		return res.status(200).json(req.user);
	} catch (error) {
		return res.status(400).json(error);
	}
};

export default withProtect(getProfile);
