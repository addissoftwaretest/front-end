import axios, {Axios, AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';

import api from 'utils/api';

import {songAction} from './song.slice';

function* createSongAsync(action: {payload: Pick<SongType, 'album' | 'artist' | 'genre' | 'title'>}) {
  try {
    const res: APIResponse = yield call(api.post, 'song/', action.payload);
    yield put(songAction.createSongSuccess(res.data.data.song!));
  } catch (error: {message: string} | any) {
    yield put(songAction.songError(error));
  }
}
export function* createSongStart() {
  yield takeLatest(songAction.createSongStart, createSongAsync);
}

function* updateSongAsync(action: {payload: Pick<SongType, 'album' | 'artist' | 'genre' | 'title' | '_id'>}) {
  try {
    const res: APIResponse = yield call(api.put, `song/${action.payload._id}`, action.payload);
    yield put(songAction.updateSongSuccess(res.data.data.song!));
  } catch (error: {message: string} | any) {
    yield put(songAction.songError(error));
  }
}
export function* updateSongStart() {
  yield takeLatest(songAction.updateSongStart, updateSongAsync);
}

function* removeSongAsync(action: {payload: {id: string}}) {
  try {
    const res: APIResponse = yield call(api.delete, `song/${action.payload.id}`);
    yield put(songAction.deleteSongSuccess({id: action.payload.id}));
  } catch (error: {message: string} | any) {
    yield put(songAction.songError(error));
  }
}
export function* removeSongStart() {
  yield takeLatest(songAction.deleteSongStart, removeSongAsync);
}

function* getSongsAsync() {
  try {
    const res: APIResponse = yield call(api.get, `song/`);
    yield put(songAction.getSongSuccess(res.data.data.songs!));
  } catch (error: {message: string} | any) {
    yield put(songAction.songError(error));
  }
}
export function* getSongsStart() {
  yield takeLatest(songAction.getSongStart, getSongsAsync);
}

function* getSongStatsAsync() {
  try {
    const res: APIResponse = yield call(api.get, `song/getstats`);
    yield put(songAction.getStatsSuccess(res.data.data.stats!));
  } catch (error: {message: string} | any) {
    yield put(songAction.songError(error));
  }
}
export function* getSongStatsStart() {
  yield takeLatest(songAction.getStatsStart, getSongStatsAsync);
}
