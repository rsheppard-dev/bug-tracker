import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../interfaces/ExtendedNextApiRequest';
import withProtect from '../middleware/withProtect';

const logout = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	try {
		req.user.tokens = req.user.tokens.filter((token: { token: string }) => {
			return token.token !== req.token;
		});

		await req.user.save();

		return res.send({});
	} catch (error) {
		console.log(error);
		return res.status(500).json(error);
	}
};

export default withProtect(logout);
