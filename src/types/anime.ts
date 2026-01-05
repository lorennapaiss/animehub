export type Anime = {
  mal_id: number;
  title: string;
  title_english?: string | null;
  images: { jpg: { image_url: string } };
  score?: number | null;
  year?: number | null;
  status?: string | null;
  episodes?: number | null;
  synopsis?: string | null;
};
