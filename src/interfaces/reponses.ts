export interface PaginatedResponseType {
  status?: number;
  message?: string;
  data?: [];
  page_details?: {
    page: number;
    per_page: number;
    total_page: number;
    total_elements: number;
    report_name: string;
  };
}
