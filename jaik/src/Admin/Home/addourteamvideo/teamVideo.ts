export interface TeamVideo {
  id: string;
  video: string;
  poster: string;
  name?: string;
  position?: string;
}

export interface TeamVideoFormData {
  video: string;
  poster: string;
  name?: string;
  position?: string;
}
