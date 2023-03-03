import React from 'react';
import Container from '@mui/material/Container';
import Grid, {GridProps} from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {Typography} from '@mui/material';
import {styled} from '@mui/material/styles';

//hooks
import useTypedSelector from 'hooks/useTypedSelector';

//
import {songAction} from 'store/song/song.slice';
import CreateModal from 'components/Modal/createModal';
import Song from 'components/Songs/song';
import StatsModal from 'components/Modal/statsModal';

const HeaderGrid = styled(Grid)<GridProps>(({theme}) => ({
  backgroundColor: 'grey',
  padding: theme.spacing(2),
  color: 'white',
}));

const HomePage = () => {
  const [modalState, setModalState] = React.useState<{open: boolean; song: any | null}>({open: false, song: null});
  const [statsModal, setStatsModal] = React.useState(false);
  const {isLoading, songs, error} = useTypedSelector((state: {song: SongStateType}) => state.song);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(songAction.getSongStart());
    dispatch(songAction.getStatsStart());
  }, [dispatch]);

  if (error && error.code === 'ERR_NETWORK') {
    throw new Error(error.message);
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: (theme) => theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: (theme) => theme.spacing(2),
      }}
    >
      <CreateModal
        open={modalState.open}
        {...modalState.song}
        handleClose={() => {
          setModalState({open: false, song: null});
        }}
      />
      <StatsModal open={statsModal} handleClose={() => setStatsModal(false)} />
      <Box>
        <Button
          variant="outlined"
          sx={{marginRight: '1rem'}}
          onClick={() => {
            setStatsModal(true);
          }}
        >
          Stats
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setModalState({open: true, song: null});
          }}
        >
          Add
        </Button>
      </Box>
      <HeaderGrid container>
        <Grid item xs={3}>
          <Typography>artist</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>genre</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>title</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>album</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>action</Typography>
        </Grid>
      </HeaderGrid>
      {isLoading ? (
        <></>
      ) : (
        songs.map((song: SongType, index: number) => {
          return <Song key={index} {...song} onUpdate={(song) => setModalState({open: true, song: song})} />;
        })
      )}
    </Container>
  );
};

export default HomePage;
