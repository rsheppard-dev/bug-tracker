import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';

const deleteAvatar = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	req.user.avatar = undefined;

	try {
		const user = await req.user.save();

		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

export default deleteAvatar;
