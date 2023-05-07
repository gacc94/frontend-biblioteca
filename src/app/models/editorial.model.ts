// IEditorialDTO =====> Request
// IEditorial =====> Response

export interface IEditorial {
    id?: number;
    name?: string;
}

export interface IEditorialDTO extends Omit<IEditorial,'id'> {
}

// export type reqStatus