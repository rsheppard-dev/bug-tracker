import { NextApiRequest } from 'next';

import { Model } from 'mongoose';

export default interface ExtendedNextApiRequest extends NextApiRequest {
	user: any;
	token: string;
}
