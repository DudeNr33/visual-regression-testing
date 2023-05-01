export interface Page<ContentType> {
    index: number;
    first: boolean;
    last: boolean;
    content: ContentType[];
}
