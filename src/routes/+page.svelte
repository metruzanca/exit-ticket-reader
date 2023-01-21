<script lang="ts">
    import { browser } from "$app/environment";

    function submit(e: Event ) {
        e.preventDefault()
        // Not sure what the right type for the onsubmit is
        // I'll prop fix this later
        const form = e.target as unknown as Record<string, {value: string}>

        if (browser) {
            console.log(form['id'].value);
            
            window.location.href = `/${form['id'].value.toString()}/${form['title'].value.toString()}`
        }
    }

</script>

<form on:submit={submit}>
    <label for="">Sheet document ID (from url)</label>
    <input type="text" name="id">
    <label for="">Sheet Title</label>
    <input type="text" name="title">
    <button>Go</button>
</form>