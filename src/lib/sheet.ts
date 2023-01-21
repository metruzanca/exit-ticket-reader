export class Sheet {
    constructor(private data: any) {}

    /** @example cell('A', 10) -> cell A10*/
    cell(column: string, row: number) {
    
    }

    /** @example range(['A', 10], ['B', 12]) -> A10:B12 */
    range(start: [string, number], end: [string, number]) {
    
    }
}
