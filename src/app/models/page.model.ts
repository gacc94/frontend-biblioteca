
export interface Page {
    number:           number;
    last:             boolean;
    size:             number;
    numberOfElements: number;
    totalPages:       number;
    pageable:         Pageable;
    sort:             Sort;
    content:          Content[];
    first:            boolean;
    totalElements:    number;
    empty:            boolean;
}

export interface Content {
    name: string;
    id:   number;
}

export interface Pageable {
    paged:      boolean;
    pageNumber: number;
    offset:     number;
    pageSize:   number;
    unpaged:    boolean;
    sort:       Sort;
}

export interface Sort {
    unsorted: boolean;
    sorted:   boolean;
    empty:    boolean;
}
