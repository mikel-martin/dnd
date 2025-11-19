export interface Playlist {
  id?: string;
  name: string;
  tracks: Track[];
}

export interface Track {
  name: string;
  url: string;
}
