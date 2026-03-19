export interface IRepositoryPaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onChange: (page: number) => void;
}
