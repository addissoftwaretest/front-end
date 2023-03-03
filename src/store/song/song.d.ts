interface SongType {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AlbumStatsType {
  name: string;
  totalSongs: number;
}

interface APIResponse extends AxiosResponse {
  data: {
    statusCode: string;
    message: string;
    data: {
      song?: SongType;
      songs?: SongType[];
      stats: SongStatsType;
    };
  };
}

interface SingersStatsType {
  name: string;
  totalSongs: number;
  totalAlbums: number;
  totalGenres: number;
  albums: AlbumStatsType[];
}

interface SongStatsType {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  singers: SingersStatsType[];
}

interface SongStateType {
  songs: SongType[];
  isLoading: boolean;
  error: any | null;
  stats: SongStatsType | null;
}
