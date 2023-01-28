<!-- You like my shitty naming? Huh? -->
<script lang="ts">
  import type { Questions, Submission } from "$lib/types";
    import { groupBy } from "$lib/utils";
  import { GENERAL_COMFORT } from "../../constants/questions";


  export let questions: Questions;
  export let submissions: Submission[];

  export let anonymize = false

  // key = index of question asking for a score
  // array contains q/a that are affected by the score
  const scores = {
    // How comfortable do you feel with this week's material?
    // 3: [],
    // Do you feel supported by all members of the instructional team?
    5: [6],
    // How can Outcomes better support you? 
    9: [10],
  }

  let generalComfort: number[] = [];

  function comfortList(submissions: Submission[]) {
    let list = [] as number[]
    for (const item of submissions) {
      const score = +item.answers[GENERAL_COMFORT] - 1
      if (list[score] === undefined) list[score] = 0
      list[score]++;
    }
    return list
  }

  $: generalComfort = comfortList(submissions)

  $: console.log(submissions);
  

  // const submissionsByiTeamSupport = groupListBy(submissions, el => +el.answers[5])
  // const submissionsByiTeamSupport = groupBy(submissions, el => el.answers[5])


</script>

<h2>{questions[GENERAL_COMFORT].label}</h2>

<table>
  <tr>
    <th>Total</th>
    <th>Feeling Overwhelmed</th>
    <th>Eh, Alright</th>
    <th>Got this!</th>
  </tr>
  <tr>
    <td>{submissions.length}</td>
    {#each generalComfort as item}
       <td>{item}</td>
    {/each}
  </tr>
  <tr>
    <td>%</td>
    {#each generalComfort as item}
       <td>{Math.floor(item / submissions.length * 100)}%</td>
    {/each}
  </tr>
</table>

<!-- <h2>{questions[5].label}</h2> -->
<h2>{questions[6].label}</h2>
<!-- {#each submissionsByiTeamSupport as score} -->
  <p>
    <!-- {score} -->
    
    <!-- {student.answers[5]}: {student.answers[6]}
    {#if !anonymize}
      <b>{student.name}</b>:  
    {/if} -->
  </p>
<!-- {/each} -->



<style>
  table, tr, td, th {
    @apply border-[1px] border-slate-500 p-1;
  }

  td, th {
    @apply text-center;
  }
</style>