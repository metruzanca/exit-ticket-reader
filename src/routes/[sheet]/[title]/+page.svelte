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
            <select id="when" class="cursor-pointer dark:bg-slate-800 bg-slate-100" bind:value={selectedGroup}>
                {#each Object.keys(groups) as date}
                    <option value="{date}">{date}</option>
                {/each}
            </select>
        </div>


        {#if selectedGroup}
             {#each questions as question, i}
                 <h2 class="text-4xl text-purple-600 dark:text-purple-300 mt-4">{question.label}</h2>
                 {#each groups[selectedGroup] as student}
                     {#if student.answers[i]}
                         <p class="pb-1">
                             <b class=" dark:text-orange-300">{student.name}</b>: 
                             {student.answers[i]}
                         </p>
                     {/if}
                 {/each}
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
