<script lang="ts">
  import { writable } from "svelte/store";
  import { getFormContext } from "__@stores/form";
  import { createEventDispatcher } from "svelte";

  const { validateField, fields = writable({}), fieldsErrors, submitted } = getFormContext() || {};
  const dispatcher: any = createEventDispatcher();
  export let name: any;
  export const value: any = ($fields && $fields[name]) || undefined;
  export let id = name;
  export let ref;
  const { class: className } = $$props;

  let invalid = true;
  let msgError: string[] | undefined;

  $: {
    if ($fieldsErrors && $fieldsErrors[name]) {
      invalid = true;
      msgError = Array.isArray($fieldsErrors[name])? $fieldsErrors[name].length > 0 && $fieldsErrors[name][0] : $fieldsErrors[name] ;
    } else {
      invalid = false;
    }
  }

  function createInputHandler() {
    const _validate = validateField(name);
    return (e: any) => {
      _validate();
      dispatcher("input", e);
    };
  }
</script>

<input
  {...$$restProps}
  {id}
  class={className}
  bind:this={ref}
  bind:value={$fields[name]}
  class:is-valid={$submitted && !invalid}
  class:is-invalid={$submitted && invalid}
  on:input={createInputHandler()}
  on:keydown
  on:keypress
/>
{#if $submitted}
  {#if invalid}
    <label for={id} class="validation-invalid-label">{msgError || ""}</label>
  {/if}
{/if}
