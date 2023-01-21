<script  lang="ts">
    type Sheet = {
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

    export let data: Sheet; // PageData


    const questions = data.table.cols.filter(({ label }) => label.length !== 0).slice(3)
    
    const entries = data.table.rows.map(({ c }) => {
        const cells = c.map(answer => answer?.f === undefined ? answer?.v : answer.f)
        return {
            date: cells[0] as string,
            name: cells[1] as string,
            answers: cells.slice(3) as string[]
        }
    })

    // Wonderful oneliner
    const dates = [...new Set(entries.map(e => (new Date(e.date)).toISOString().split('T')[0]))]
    
    // TODO group by date

</script>

<div>
    <main>
        {#each questions as question, i}
            <h2>{question.label}</h2>
            {#each entries as student}
                <p>
                    <b>{student.name}</b>: 
                    {student.answers[i]}
                </p>
            {/each}
            <hr>
        {/each}
    </main>

    <details>
        <summary>Raw Data</summary>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    </details>

</div>