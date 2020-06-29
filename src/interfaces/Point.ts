import Item from "./Item";

export default interface Point {
  id?: number;
  name: string;
  email: string;
  whatsapp: string;
  latitude: number;
  longitude: number;
  city: string;
  uf: string;
  items?: Item[];
  items_id?: number[];
}
