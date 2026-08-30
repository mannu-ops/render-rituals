export interface NavigationItem {
  id?: string;
  label: string;
  href: string;
  external?: boolean;
  visible?: boolean;
  order?: number;
}
