<script lang="ts">
  import type { Questions, Submission } from "$lib/types";

  export let questions: Questions
  export let entries: Submission[]
</script>

<details>
    <summary>Raw Data</summary>
    <details>
        <summary>Questions</summary>
        <pre>{JSON.stringify(questions, null, 2)}</pre>
    </details>
    <details>
        <summary>Answers</summary>
        <pre>{JSON.stringify(entries, null, 2)}</pre>
    </details>
</details>