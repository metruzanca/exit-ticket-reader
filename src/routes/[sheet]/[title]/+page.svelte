<script  lang="ts">
    import Debug from "$lib/components/Debug.svelte";
    import QandA from "$lib/components/QandA.svelte";
    import ScoreQandA from "$lib/components/ScoreQandA.svelte";
    import type { Sheet } from "$lib/types";
    import { groupBy } from "$lib/utils";

    export let data: Sheet; // PageData
    let selectedGroup: string;
    let anonymize = true;
    let considerScore = false;

    const questions = data.table.cols.filter(({ label }) => label.length !== 0).slice(3)
    
    const entries = data.table.rows.map(({ c }) => {
        const cells = c.map(answer => answer?.f === undefined ? answer?.v : answer.f)
        return {
            date: (cells[0] as string).split(' ')[0],
            name: cells[1] as string,
            answers: cells.slice(3) as string[]
        }
    })

    const submissionsByDate = groupBy(entries, el => el.date)

    const sortedDates = Object.keys(submissionsByDate).sort().reverse()

</script>

<div>
    <main class="max-w-[600px] mx-2">
        <h1  class="text-5xl">Exit Ticket Viewer</h1>
        <div>
            <label for="when">When?</label>
            <select id="when" bind:value={selectedGroup}>
                {#each sortedDates as date}
                    <option value="{date}">{date}</option>
                {/each}
            </select>
        </div>

        <label for="anonymize">Anonymize</label>
        <input type="checkbox" id="anonymize" bind:checked={anonymize}>

        <label for="comfort">Show by Comfort Scores?</label>
        <input type="checkbox" id="comfort" bind:checked={considerScore}>


        {#if considerScore}
            <ScoreQandA
                {questions}
                {anonymize}
                submissions={submissionsByDate[selectedGroup]}
            />
        {:else}
            <QandA
                {questions}
                {anonymize}
                submissions={submissionsByDate[selectedGroup]}
            />
        {/if}

        <Debug {questions} {entries} />
    </main>

</div>
