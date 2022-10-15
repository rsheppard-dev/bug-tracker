import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import ExtendedNextApiRequest from '../../../../interfaces/ExtendedNextApiRequest';
import connectMongo from '../../../../db/mongoose';
import getAvatar from '../../../../lib/apis/getAvatar';

const handler = nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (error, req, res, next) => {
		console.log(error.stack);
		res.status(400).end(error.message);
	},
	onNoMatch: (req, res) => {
		res.status(404).end('This page was not found.');
	},
}).get(async (req, res) => {
	try {
		await connectMongo();
		getAvatar(req, res);
	} catch (error: any) {
		throw new Error('Failed to get avatar.');
	}
});

export default handler;
