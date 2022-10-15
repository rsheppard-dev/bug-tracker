import type { NextApiResponse } from 'next';

import nc from 'next-connect';

import ExtendedNextApiRequest from '../../../../interfaces/ExtendedNextApiRequest';
import auth from '../../../../middleware/auth';
import getProfile from '../../../../lib/apis/getProfile';
import connectMongo from '../../../../db/mongoose';
import deleteUser from '../../../../lib/apis/deleteUser';
import updateUser from '../../../../lib/apis/updateUser';

const handler = nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (error, req, res, next) => {
		console.log(error.stack);
		res.status(400).end(error.message);
	},
	onNoMatch: (req, res) => {
		res.status(404).end('This page was not found.');
	},
})
	.get(auth, async (req, res) => {
		try {
			await connectMongo();
			getProfile(req, res);
		} catch (error: any) {
			throw new Error('Failed to get profile.');
		}
	})

	.patch(auth, async (req, res) => {
		try {
			await connectMongo();
			updateUser(req, res);
		} catch (error) {
			throw new Error('Failed to update profile.');
		}
	})

	.delete(auth, async (req, res) => {
		try {
			await connectMongo();
			deleteUser(req, res);
		} catch (error) {
			throw new Error('Failed to delete user.');
		}
	});

export default handler;
