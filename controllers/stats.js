'use strict';

import logger from "../utils/logger.js";
import playlistStore from "../models/playlist-store.js";
import userStore from "../models/user-store.js";
import accounts from "./accounts.js";

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

      const playlists = playlistStore.getAllPlaylists();

      const numPlaylists = playlists.length;

      const numSongs = playlists.reduce(
        (total, playlist) => total + playlist.songs.length,
        0
      );

      const average = numPlaylists > 0 ? (numSongs / numPlaylists).toFixed(2) : 0;

      const totalRating = playlists.reduce(
        (total, playlist) => total + parseInt(playlist.rating),
        0
      );

      const avgRating = numPlaylists > 0 ? totalRating / numPlaylists : 0;

      const maxRating =
        playlists.length > 0
          ? Math.max(...playlists.map((playlist) => playlist.rating))
          : 0;

      const maxRated = playlists.filter((playlist) => playlist.rating === maxRating);
      const favTitles = maxRated.map((item) => item.title);

      const longestSize =
        playlists.length > 0
          ? Math.max(...playlists.map((playlist) => playlist.songs.length))
          : 0;

      const longestPlaylists = playlists.filter(
        (playlist) => playlist.songs.length === longestSize
      );
      const longestPlaylistTitles = longestPlaylists.map((item) => item.title);

      const numUsers = userStore.getAllUsers().length;

      const statistics = {
        displayNumPlaylists: numPlaylists,
        displayNumSongs: numSongs,
        displayAverage: average,
        displayAvgRating: avgRating,
        highest: maxRating,
        displayFav: favTitles,
        longest: longestSize,
        longestTitles: longestPlaylistTitles,
        displayNumUsers: numUsers,
      };

      const viewData = {
        title: "Playlist App Statistics",
        stats: statistics,
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      };

      response.render("stats", viewData);
    } else {
      response.redirect("/");
    }
  },
};

export default stats;