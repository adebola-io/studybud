<script>
    import Router, { push } from "svelte-spa-router";
    import routes from "./routes";
    import { MainLayout } from "./layouts";
</script>

<MainLayout>
    <Router {routes} on:conditionsFailed={() => push("/")} />
</MainLayout>
