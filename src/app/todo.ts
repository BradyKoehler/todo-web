export interface Todo {
  readonly id: number;
  readonly list_id: number;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}