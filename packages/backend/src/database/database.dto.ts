export interface Pagination {
  take?: number;
  skip?: number;
}

export interface SnippetWhere {
  owner?: { id: string };
}
