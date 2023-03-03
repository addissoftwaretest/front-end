import React from 'react';
import {Modal} from '@mui/material';
import Box, {BoxProps} from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';

//
import {FormContainer} from './styles';
import {songAction} from 'store/song/song.slice';
import useTypedSelector from 'hooks/useTypedSelector';

const ModalBox = styled(Box)<BoxProps>(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  padding: 4,
}));

interface CreateModalProps {
  open: boolean;
  handleClose(): void;
  _id?: string;
  album?: string;
  artist?: string;
  genre?: string;
  title?: string;
}

const CreateModal: React.FC<CreateModalProps> = ({open, handleClose, _id, album, artist, genre, title}) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const {songs} = useTypedSelector((state: {song: SongStateType}) => state.song);

  React.useEffect(() => {
    if (loading) {
      setLoading(false);
      handleClose();
    }
  }, [songs]);

  const validationSchema = Yup.object({
    album: Yup.string().required(),
    artist: Yup.string().required(),
    genre: Yup.string().required(),
    title: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {album: album ?? 'l', artist: artist ?? '', genre: genre ?? '', title: title ?? ''},
    validationSchema,
    enableReinitialize: true,

    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      if (_id) {
        dispatch(
          songAction.updateSongStart({
            _id,
            album: values.album,
            artist: values.artist,
            genre: values.genre,
            title: values.title,
          }),
        );
      } else {
        dispatch(
          songAction.createSongStart({
            album: values.album,
            artist: values.artist,
            genre: values.genre,
            title: values.title,
          }),
        );
      }
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox sx={{boxShadow: 24}}>
        <Paper>
          <FormContainer onSubmit={formik.handleSubmit}>
            <TextField
              error={formik.errors.album != null}
              label="Album"
              name="album"
              helperText={formik.errors.album}
              variant="outlined"
              value={formik.values.album}
              onChange={formik.handleChange}
            />
            <TextField
              error={formik.errors.artist != null}
              label="Artist"
              name="artist"
              helperText={formik.errors.artist}
              variant="outlined"
              value={formik.values.artist}
              onChange={formik.handleChange}
            />
            <TextField
              error={formik.errors.genre != null}
              label="Genre"
              name="genre"
              helperText={formik.errors.genre}
              variant="outlined"
              value={formik.values.genre}
              onChange={formik.handleChange}
            />
            <TextField
              error={formik.errors.title != null}
              label="Title"
              name="title"
              helperText={formik.errors.title}
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <Button type="submit" variant="contained" disabled={formik.errors == null || loading}>
              <Typography textTransform={'capitalize'}>{_id ? 'update' : 'Submit'}</Typography>
            </Button>
          </FormContainer>
        </Paper>
      </ModalBox>
    </Modal>
  );
};

export default CreateModal;
