export type MediaType =
  | "image"
  | "video"
  | "document";

export interface MediaAsset {
  id?: string;
  name: string;
  url: string;
  type: MediaType;
  alt?: string;
  width?: number;
  height?: number;
  size?: number;
  folder?: string;
  createdAt?: string;
}
