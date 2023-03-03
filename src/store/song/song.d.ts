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
  singers: SingersStatsType[];
}

interface SongStateType {
  songs: SongType[];
  isLoading: boolean;
  error: string | null;
  stats: SongStatsType | null;
}
