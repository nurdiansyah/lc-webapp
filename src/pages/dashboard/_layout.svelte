<!--routify:options title="Home"-->
<script lang="ts">
  import { url } from "@roxi/routify";
  import { getBreadcrumbStore, BREADCRUMB_CONTEXT } from "__@stores/breadcrumb";
  import { getContext } from "svelte";

  const { setBreadcrumbContext, breadcrumbStore } = getBreadcrumbStore();
  setBreadcrumbContext([]);

</script>
<slot />
