export interface Suggestion {
  id: string;
  title: string;
  content: string;
  [key: string]: any; // Pour les propriétés supplémentaires
}

export interface ApiResponse {
  data: Suggestion[];
  meta?: {
    pagination?: {
      total: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
    }
  };
}