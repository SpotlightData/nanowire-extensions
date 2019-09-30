export interface TermTrendsFilters {
  hasType: string;
  startDate: Date;
  endDate: Date;
}

export interface TermResult {
  datePublished: string;
  hasValue: string | null;
  hasCount: string;
}
