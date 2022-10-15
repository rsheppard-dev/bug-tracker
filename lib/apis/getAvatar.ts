import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';
import User from '../../models/User';

const getAvatar = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	const { _id } = req.query;

	try {
		const user = await User.findById(_id);

		if (!user || !user.avatar) {
			throw new Error();
		}

		res.setHeader('Content-Type', 'image/png');
		res.status(200).send(user.avatar);
	} catch (error) {
		res.status(404).json(error);
	}
};

export default getAvatar;
