'use strict';

import express from 'express';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import playlist from './controllers/playlist.js';
import stats from "./controllers/stats.js";

const router = express.Router();

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);
router.get('/playlist/:id', playlist.createView);
router.post('/playlist/:id/addsong', playlist.addSong);
router.post('/dashboard/addplaylist', dashboard.addPlaylist);
router.post('/playlist/:id/updatesong/:songid', playlist.updateSong);


router.get('/playlist/:id/deletesong/:songid', playlist.deleteSong);

router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);

router.get("/stats", stats.createView);

export default router;