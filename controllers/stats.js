"use strict";

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");

    const playlists = playlistStore.getAllPlaylists();

    const numPlaylists = playlists.length;

    const numSongs = playlists.reduce(
      (total, playlist) => total + (playlist.songs ? playlist.songs.length : 0),
      0
    );

    const average =
      numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : "0.00";

    const totalRating = playlists.reduce(
      (total, playlist) => total + (Number(playlist.rating) || 0),
      0
    );

    const avgRating =
      numPlaylists > 0 ? (totalRating / numPlaylists).toFixed(2) : "0.00";

    const ratings = playlists.map((playlist) => Number(playlist.rating) || 0);
    const maxRating = ratings.length > 0 ? Math.max(...ratings) : 0;

    const maxRated = playlists.filter(
      (playlist) => (Number(playlist.rating) || 0) === maxRating
    );

    const favTitles = maxRated.map((item) => item.title);

    const songCounts = playlists.map((playlist) =>
      playlist.songs ? playlist.songs.length : 0
    );
    const mostSongs = songCounts.length > 0 ? Math.max(...songCounts) : 0;

    const mostSongsPlaylists = playlists.filter(
      (playlist) => (playlist.songs ? playlist.songs.length : 0) === mostSongs
    );

    const mostSongsTitles = mostSongsPlaylists.map((playlist) => playlist.title);

    const statistics = {
      displayNumPlaylists: numPlaylists,
      displayNumSongs: numSongs,
      displayAverage: average,
      displayAvgRating: avgRating,
      highest: maxRating,
      displayFav: favTitles,
      displayMostSongs: mostSongs,
      displayMostSongsTitles: mostSongsTitles,
    };

    const viewData = {
      title: "Playlist App Statistics",
      stats: statistics,
    };

    response.render("stats", viewData);
  },
};

export default stats;