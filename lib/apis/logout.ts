import { NextApiResponse } from 'next';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';

const logout = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
	try {
		req.user.tokens = req.user.tokens.filter((token: { token: string }) => {
			return token.token !== req.token;
		});

		await req.user.save();

		res.send({});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};

export default logout;
