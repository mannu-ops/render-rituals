export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Visualization"
  | "Architecture"
  | "Interior Design"
  | "Interior"
  | "Planning"
  | string;

export interface Render3DItem {
  id?: string;
  title: string;
  image: string;
  tag?: string;
  description?: string;
}

export interface Plan2DItem {
  id?: string;
  title: string;
  image: string;
  sheetType?: string;
  scale?: string;
  description?: string;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  location?: string;
  image: string;
  coverImage?: string;
  excerpt?: string;
  description?: string;
  scope?: string[] | string;
  services?: string[];
  gallery?: string[];
  images?: string[];
  materials?: string[];
  software?: string[];
  client?: string;
  atmosphere?: string;
  turnaround?: string;
  featured?: boolean;
  published?: boolean;
  renders3D?: Render3DItem[];
  plans2D?: Plan2DItem[];
  createdAt?: string;
  updatedAt?: string;
}
