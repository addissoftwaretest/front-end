import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: SongStateType = {
  songs: [],
  stats: null,
  error: '',
  isLoading: false,
};

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    createSongStart: (
      state: SongStateType,
      action: PayloadAction<Pick<SongType, 'album' | 'artist' | 'genre' | 'title'>>,
    ) => {
      state.isLoading = true;
    },
    createSongSuccess: (state: SongStateType, action: PayloadAction<SongType>) => {
      state.isLoading = false;
      state.error = null;
      state.songs.push(action.payload);
    },

    updateSongStart: (
      state: SongStateType,
      action: PayloadAction<Pick<SongType, '_id' | 'album' | 'artist' | 'genre' | 'title'>>,
    ) => {
      state.isLoading = true;
    },
    updateSongSuccess: (state: SongStateType, action: PayloadAction<SongType>) => {
      state.isLoading = false;
      state.error = null;
      state.songs = state.songs.map((song) => {
        if (song._id === action.payload._id) return action.payload;
        return song;
      });
    },

    deleteSongStart: (state: SongStateType, action: PayloadAction<{id: string}>) => {
      state.isLoading = true;
    },
    deleteSongSuccess: (state: SongStateType, action: PayloadAction<{id: string}>) => {
      state.isLoading = false;
      state.error = null;
      state.songs = state.songs.filter((song) => song._id !== action.payload.id);
    },

    getSongStart: (state: SongStateType) => {
      state.isLoading = true;
    },

    getSongSuccess: (state: SongStateType, action: PayloadAction<SongType[]>) => {
      state.isLoading = false;
      state.error = null;
      state.songs = action.payload;
    },

    getStatsStart: (state: SongStateType) => {
      state.isLoading = true;
    },

    getStatsSuccess: (state: SongStateType, action: PayloadAction<SongStatsType>) => {
      state.isLoading = false;
      state.error = null;
      state.stats = action.payload;
    },
    songError: (state: SongStateType, action: PayloadAction<any>) => {
      state.isLoading = true;
      state.error = action.payload;
    },
  },
});

const songReducer = songSlice.reducer;
const songAction = songSlice.actions;

export {songReducer, songAction};
