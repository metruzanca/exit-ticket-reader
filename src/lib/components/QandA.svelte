<script lang="ts">
  import type { Questions, Submission } from "$lib/types";

  export let questions: Questions;
  export let submissions: Submission[];
  export let anonymize = false
</script>

{#if submissions}
  {#each questions as question, i}
    <h2>{question.label}</h2>
    {#each submissions as student}
        {#if student.answers[i]}
            <p>
            {#if !anonymize}
                <b>{student.name}</b>: 
            {/if}
            {student.answers[i]}
            </p>
        {/if}
    {/each}
  {/each}
{/if}

