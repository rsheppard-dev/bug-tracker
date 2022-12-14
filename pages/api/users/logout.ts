// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import auth from '../../../middleware/auth';
import logout from '../../../lib/apis/logout';
import ExtendedNextApiRequest from '../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../db/mongoose';

const handler = nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (error, req, res, next) => {
		console.log(error.stack);
		res.status(400).end(error.message);
	},
	onNoMatch: (req, res) => {
		res.status(404).end('This page was not found.');
	},
}).post(auth, async (req, res) => {
	try {
		await connectMongo();
		logout(req, res);
	} catch (error: any) {
		throw new Error('Failed to logout.');
	}
});

export default handler;
