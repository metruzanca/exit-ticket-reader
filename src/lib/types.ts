export type Sheet = {
    table: {
        cols: Array<{
            label: string
        }>
        rows: Array<{
            c: Array<null | {
                v: string | number
                f?: string
            }>
        }>
    }
}