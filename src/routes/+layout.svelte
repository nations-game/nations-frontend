<script lang="ts">
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from "@floating-ui/dom";
    import { storePopup, initializeStores, Toast } from "@skeletonlabs/skeleton";
    import "../app.postcss";

    initializeStores();
    
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Toast />
<slot />