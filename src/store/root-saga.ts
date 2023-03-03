import {all, call} from 'redux-saga/effects';

import {
  createSongStart,
  getSongStatsStart,
  getSongsStart,
  removeSongStart,
  updateSongStart,
} from 'store/song/song.saga';

export default function* rootSage() {
  yield all([
    call(createSongStart),
    call(getSongStatsStart),
    call(getSongsStart),
    call(updateSongStart),
    call(removeSongStart),
  ]);
}
