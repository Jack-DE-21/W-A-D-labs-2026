'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import { v4 as uuidv4 } from 'uuid';

const dashboard = {

  createView(request, response) {
    const viewData = {
      title: 'Playlist Dashboard',
      playlists: playlistStore.getAllPlaylists(),
    };
    response.render('dashboard', viewData);
  },

  addPlaylist(request, response) {
    const newPlayList = {
      id: uuidv4(),
      title: request.body.title,
      songs: [],
    };
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
  },


deletePlaylist(request, response) {
  const playlistId = request.params.id;
  logger.debug(`Deleting Playlist ${playlistId}`);
  playlistStore.removePlaylist(playlistId);
  response.redirect('/dashboard');
},

async addPlaylist(request, response) {
  const timestamp = new Date();

  const newPlaylist = {
    id: uuidv4(),
    title: request.body.title,
   rating: parseInt(request.body.rating) || 3,  /* Update the Add Playlist form (and related function) so that a rating can be given to new playlists. done here */
    date: timestamp,
    songs: []
  };

  await playlistStore.addPlaylist(newPlaylist);
  response.redirect('/dashboard');
},

};

export default dashboard;