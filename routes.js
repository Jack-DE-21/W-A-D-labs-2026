'use strict';

import express from 'express';
import accounts from './controllers/accounts.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import playlist from './controllers/playlist.js';
import stats from "./controllers/stats.js";

const router = express.Router();

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);

router.get('/about', about.createView);
router.get('/playlist/:id', playlist.createView);
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/playlist/:id/updatesong/:songid', playlist.updateSong);
router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);

router.get('/stats', stats.createView);
router.get('/searchCategory', dashboard.createView);
router.get('/sortData', dashboard.createView);

export default router;