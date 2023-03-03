import React from 'react';
import {Grid, IconButton, Typography} from '@mui/material';
import {useDispatch} from 'react-redux';
import EditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';

//
import {songAction} from 'store/song/song.slice';

interface SongProps extends SongType {
  onUpdate(song: Pick<SongType, '_id' | 'album' | 'artist' | 'genre' | 'title'>): void;
}
const Song: React.FC<SongProps> = ({artist, album, genre, title, _id, onUpdate}) => {
  const dispatch = useDispatch();

  return (
    <Grid
      container
      sx={{
        borderBottom: '1px solid black',
      }}
    >
      <Grid item xs={3}>
        <Typography>{artist}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{genre} </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{title} </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>{album} </Typography>
      </Grid>
      <Grid>
        <IconButton
          aria-label="delete"
          color="primary"
          onClick={(e) => dispatch(songAction.deleteSongStart({id: _id}))}
        >
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton
          aria-label="edit"
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            onUpdate({artist, album, genre, title, _id});
          }}
        >
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Song;
