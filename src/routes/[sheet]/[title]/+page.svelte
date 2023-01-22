<script  lang="ts">
    import type { Sheet } from "$lib/types";
    import { groupBy } from "$lib/utils";

    export let data: Sheet; // PageData
    let selectedGroup: string;

    const questions = data.table.cols.filter(({ label }) => label.length !== 0).slice(3)
    
    const entries = data.table.rows.map(({ c }) => {
        const cells = c.map(answer => answer?.f === undefined ? answer?.v : answer.f)
        return {
            date: (cells[0] as string).split(' ')[0],
            name: cells[1] as string,
            answers: cells.slice(3) as string[]
        }
    })

    const groups = groupBy(entries, el => el.date)

</script>

<div>
    <main class="max-w-[600px] mx-2">
        <h1  class="text-4xl">Exit Ticket Viewer</h1>
        <div>
            <label for="when">When?</label>
            <select id="when" class="cursor-pointer" bind:value={selectedGroup}>
                {#each Object.keys(groups) as date}
                    <option value="{date}">{date}</option>
                {/each}
            </select>
        </div>

        <hr>


        {#if selectedGroup}
             {#each questions as question, i}
                 <h2 class="text-4xl">{question.label}</h2>
                 {#each groups[selectedGroup] as student}
                     {#if student.answers[i]}
                         <p class="pb-1">
                             <b>{student.name}</b>: 
                             {student.answers[i]}
                         </p>
                     {/if}
                 {/each}
                 <hr>
             {/each}
        {/if}


        
        <details>
            <summary>Raw Data</summary>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </details>
    </main>

</div>
