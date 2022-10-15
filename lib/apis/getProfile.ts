import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';

const getProfile = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		res.status(200).json(req.user);
	} catch (error) {
		res.status(400).json(error);
	}
};

export default getProfile;
