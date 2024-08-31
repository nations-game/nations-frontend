<script lang="ts">
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
    import { storePopup, initializeStores, Toast } from "@skeletonlabs/skeleton";
    import "../app.postcss";

    initializeStores();
    
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:head>
  <link rel="icon" type="image/png" href="/favicon.png" />
</svelte:head>

<Toast />
<slot />