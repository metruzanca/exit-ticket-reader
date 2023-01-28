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

export type Submission = {
  date: string;
  name: string;
  answers: string[];
}

export type Questions = {
  label: string;
}[]
