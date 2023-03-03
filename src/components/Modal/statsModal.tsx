import React from 'react';
import {Modal} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box, {BoxProps} from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';

//
import useTypedSelector from 'hooks/useTypedSelector';

interface StatsModalProps {
  open: boolean;
  handleClose(): void;
}

const ModalBox = styled(Box)<BoxProps>(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  padding: 4,
}));

const StatsModal: React.FC<StatsModalProps> = ({open, handleClose}) => {
  const {stats} = useTypedSelector((state) => state.song);
  return (
    <Modal open={open} onClose={handleClose}>
      <ModalBox>
        <Paper>
          <Box
            sx={{
              padding: (theme) => theme.spacing(2),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box sx={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
              <Typography fontWeight={'700'} display={'inline-block'}>
                totalSongs :{' '}
              </Typography>
              <Typography display={'inline-block'}>{stats?.totalSongs}</Typography>
              <Typography fontWeight={'700'} display={'inline-block'}>
                totalArtists :
              </Typography>
              <Typography display={'inline-block'}> {stats?.totalArtists}</Typography>
              <Typography fontWeight={'700'} display={'inline-block'}>
                totalAlbums
              </Typography>{' '}
              : <Typography display={'inline-block'}>{stats?.totalAlbums}</Typography>
              <Typography fontWeight={'700'} display={'inline-block'}>
                totalGenres :{' '}
              </Typography>
              <Typography display={'inline-block'}>{stats?.totalGenres}</Typography>
            </Box>
            {stats?.singers.map((singer) => (
              <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', pt: (theme) => theme.spacing(2)}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', border: '1px solid grey'}}>
                  <Box>
                    <Typography fontWeight={'600'} display={'inline-block'}>
                      Artist name :{' '}
                    </Typography>
                    <Typography display={'inline-block'}>{singer.name}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={'600'} display={'inline-block'}>
                      totalAlbums :
                    </Typography>{' '}
                    <Typography display={'inline-block'}> {singer.totalAlbums}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={'600'} display={'inline-block'}>
                      totalGenres :{' '}
                    </Typography>
                    <Typography display={'inline-block'}>{singer.totalGenres}</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={'600'} display={'inline-block'}>
                      totalSongs :{' '}
                    </Typography>
                    <Typography display={'inline-block'}>{singer.totalSongs}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    px: (theme) => theme.spacing(2),
                    border: '1px solid grey',
                  }}
                >
                  {singer.albums.map((albums) => (
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <Box>
                        <Typography fontWeight={'600'} display={'inline-block'}>
                          Album name :
                        </Typography>
                        <Typography display={'inline-block'}>{albums.name}</Typography>
                      </Box>
                      <Box>
                        <Typography fontWeight={'600'} display={'inline-block'}>
                          totalSongs :
                        </Typography>
                        <Typography display={'inline-block'}>{albums.totalSongs}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </ModalBox>
    </Modal>
  );
};

export default StatsModal;
