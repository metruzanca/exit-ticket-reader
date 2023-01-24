<script>
    import { browser } from "$app/environment";
  import "../app.css";
  let isDark = false;

  if (browser) {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  $: {
    if (browser) document.body.classList.toggle('dark', isDark)
  }

</script>

<nav class="absolute top-1 right-1">
  <input type="checkbox" id="theme" bind:checked={isDark}>
  <label for="theme">Dark Theme?</label>
</nav>

<slot />
