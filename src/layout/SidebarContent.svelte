<script lang="ts">
  import { url, isActive } from "@roxi/routify";
  import Icon from "@deboxsoft/svelte-theme-limitless/components/Icon.svelte";
  import Accordion from "@deboxsoft/svelte-theme-limitless/components/Accordion.svelte";
  import AccordionItem from "@deboxsoft/svelte-theme-limitless/components/AccordionItem.svelte";
  import { getAuthenticationContext } from "__@modules/users";
  import Avatar from "__@comps/Avatar.svelte";

  const { authenticationStore } = getAuthenticationContext();
  let scrollbar;
  let elRef;
  $: profile = $authenticationStore.profile;

  export let menus;

  let collapse: boolean = false;
</script>

<!-- Header -->
<div class="card-header header-elements-inline">
  <h6 class="card-title">MAIN MENU</h6>
</div>

{#if !collapse}
  {#if $authenticationStore.authenticated}
    <div class="sidebar-user">
      <div class="card-body">
        <div class="media">
          <div class="mr-3">
            <Avatar size="50px" class="mr-2" />
          </div>
          <div class="media-body">
            <div class="media-title font-weight-semibold">{profile.displayName}</div>
            <div class="font-size-xs opacity-50"><i class="icon-pin font-size-sm" /> &nbsp;{profile.session && profile.session.role || "-"}</div>
          </div>

          <div class="ml-3 align-self-center"><a href="/#" class="text-white"><i class="icon-cog3" /></a></div>
        </div>
      </div>
    </div>
  {/if}
  <!-- Main navigation -->
  <div class="card-body p-0">
    <Accordion class="nav-sidebar">
<!--      <li class="nav-item-header mt-0">-->
<!--        <div class="text-uppercase font-size-xs line-height-xs">Main</div>-->
        <!--        <div style="width: 20px; height: 20px;">-->
        <!--          <MenuIcon />-->
        <!--        </div>-->
<!--      </li>-->
      <!-- Dashboard -->
      <!--      <AccordionItem href={$url("/")}>-->
      <!--        <Icon component={HomeIcon} />-->
      <!--        <span> Dashboard</span>-->
      <!--      </AccordionItem>-->

      {#each menus as item}
        {#if item.show}
          <AccordionItem
            expanded={!!item.children && $isActive(item.url)}
            let:expanded={_expand}
            toggleClass={$isActive(item.url) && "active"}
            target={(item.children && !item.url && "_self") || undefined}
            hasChildren={!!item.children}
            href={(!item.children && item.url) || "/#"}
          >
            {#if item.icon && typeof item.icon === "string"}
              <i class={item.icon} />
            {:else if item.icon}
              <Icon component={item.icon} />
            {/if}
            <span>{item.label}</span>
            <ul
              slot="menu"
              style={_expand ? "display: block;" : ""}
              class="nav nav-group-sub"
              data-submenu-title={item.label}
            >
              {#each item.children as subItem}
                {#if subItem.show}
                  <li class="nav-item">
                    <a class="nav-link" class:active={$isActive(subItem.url)} href={$url(subItem.url)}>
                      {#if subItem.icon && typeof subItem.icon === "string"}
                        <i class={subItem.icon} />
                      {:else if subItem.icon}
                        <Icon component={subItem.icon} />
                      {/if}
                      <span>{subItem.label}</span></a
                    >
                  </li>
                {/if}
              {/each}
            </ul>
          </AccordionItem>
        {/if}
      {/each}
    </Accordion>
  </div>
{/if}

<style lang="scss" global>
  .nav-sidebar .nav-item-header > svg {
    display: none;
  }

  .sidebar-content {
    //height: calc(100vh - 70px);
    //overflow-y: scroll !important;
  }
</style>
