
export interface IPage<T> {
    number:           number;
    last:             boolean;
    size:             number;
    numberOfElements: number;
    totalPages:       number;
    pageable:         IPageable;
    sort:             ISort;
    content:          T[];
    first:            boolean;
    totalElements:    number;
    empty:            boolean;
}

export interface IPageable {
    paged:      boolean;
    pageNumber: number;
    offset:     number;
    pageSize:   number;
    unpaged:    boolean;
    sort:       ISort;
}

export interface ISort {
    unsorted: boolean;
    sorted:   boolean;
    empty:    boolean;
}
