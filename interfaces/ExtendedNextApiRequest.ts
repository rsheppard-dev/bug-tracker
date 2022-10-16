import { NextApiRequest } from 'next';
export default interface ExtendedNextApiRequest extends NextApiRequest {
	user: Partial<any>;
	file: {
		buffer: Buffer;
	};
	token: string;
}
