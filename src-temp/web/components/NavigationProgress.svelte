<script lang="ts">
    import "nprogress/nprogress.css";
    import NProgress from "nprogress";
    import { navigating } from "$app/stores";

    NProgress.configure({
        minimum: 0.16,
    });

    $: {
        if ($navigating) {
            NProgress.start();
        } else {
            NProgress.done()
        };
    }
</script>
  