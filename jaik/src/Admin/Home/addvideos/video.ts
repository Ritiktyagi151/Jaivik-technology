export interface Video {
  id?: string;
  src: string;
  poster: string;
}

export type VideoFormData = Omit<Video, "id">;
