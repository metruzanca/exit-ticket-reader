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
    <main class="max-w-[600px] mx-2">
        {#each questions as question, i}
            <h2 class="text-4xl">{question.label}</h2>
            {#each entries as student}
                {#if student.answers[i]}
                    <p class="pb-1">
                        <b>{student.name}</b>: 
                        {student.answers[i]}
                    </p>
                {/if}
            {/each}
            <hr>
        {/each}

        
        <details>
            <summary>Raw Data</summary>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </details>
    </main>

</div>
