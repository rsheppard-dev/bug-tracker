import { NextApiRequest } from 'next';

export default interface ExtendedNextApiRequest extends NextApiRequest {
	user: any;
	token: string;
}
