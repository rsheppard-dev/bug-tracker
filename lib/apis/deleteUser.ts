import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';
import { sendGoodbyeEmail } from '../emails/account';

const deleteUser = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	const { email, firstName } = req.user;

	try {
		await req.user.remove();
		sendGoodbyeEmail(email, firstName);

		res.status(200).json(req.user);
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default deleteUser;
