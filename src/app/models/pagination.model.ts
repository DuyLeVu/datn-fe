export class Pagination {
    selectItemsPerPage: number[] = [5, 10, 25, 100];
    pageSize = this.selectItemsPerPage[0];
    // pageSize = [0];
    pageIndex = 1;
    allItemsLength = 0;
}
