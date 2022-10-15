import { NextApiResponse } from 'next';

import sharp from 'sharp';

import ExtendedNextApiRequest from '../../interfaces/ExtendedNextApiRequest';

const createAvatar = async (
	req: ExtendedNextApiRequest,
	res: NextApiResponse
) => {
	try {
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 250, height: 250 })
			.png()
			.toBuffer();
		req.user.avatar = buffer;
		const user = await req.user.save();
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

export default createAvatar;
