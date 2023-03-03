import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {useDispatch} from 'react-redux';

//hooks
import useTypedSelector from 'hooks/useTypedSelector';

//
import {songAction} from 'store/song/song.slice';
const HomePage = () => {
  const {isLoading, songs} = useTypedSelector((state: {song: SongStateType}) => state.song);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(songAction.getSongStart);
    dispatch(songAction.getStatsStart);
  }, []);

  return (
    <Container maxWidth="sm">
      {isLoading ? (
        <></>
      ) : (
        songs.map((song: SongType) => {
          return (
            <Grid container>
              <Grid item xs={4}>
                {song.artist}
              </Grid>
              <Grid item xs={4}>
                {song.genre}
              </Grid>
              <Grid item xs={4}>
                {song.title}
              </Grid>
              <Grid item xs={4}>
                {song.album}
              </Grid>
            </Grid>
          );
        })
      )}
    </Container>
  );
};

export default HomePage;
