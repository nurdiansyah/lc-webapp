<script>
  import Table from "__@comps/Table.svelte";
  import { getUserContext } from "__@modules/users";
  import { url, goto } from "@roxi/routify";
  import Dropdown from "__@comps/Dropdown.svelte";
  import DropdownToggle from "__@comps/DropdownToggle.svelte";
  import { createAclContext } from "../_acl-context";

  const { readUserGranted } = createAclContext();
  const { groupStore, findGroup } = getUserContext();
  if (!readUserGranted) {
    $goto("/access-denied");
  }
</script>

<div class="card d-flex flex-1 flex-column">
  <div class="card-body d-flex flex-1">
    <Table items={$groupStore} let:item={group}>
      <div class="dbx-thead" slot="header">
        <div class="dbx-cell">Nama Group</div>
        <div class="dbx-cell role">Hak Akses</div>
        <div class="dbx-cell -menu-list" />
      </div>
      <div class="dbx-tr">
        <div class="dbx-cell">{group.name || ""}</div>
        <div class="dbx-cell role">{group.role || ""}</div>
        <div class="dbx-cell -menu-list" style="width: 30px">
          <div class="list-icons">
            <Dropdown>
              <DropdownToggle class="list-icons-item align-items-center" tag="div">
                <i class="icon-menu9" />
              </DropdownToggle>
              <svelte:fragment slot="menu">
                <!--      <a href={$url("./:id/view", { id })} class="dropdown-item"><i class="icon-eye" />Lihat Akun</a>-->
                <a href={$url("./:id/update", { id: group.id, name: group.name, role: group.role, metadata: JSON.stringify(group.metadata) })} class="dropdown-item"><i class="icon-pencil5" />Ubah Group</a>
                <a href={$url("./:id/remove", { id: group.id, name: group.name })} class="dropdown-item"><i class="icon-minus2" />Hapus Group</a>
              </svelte:fragment>
            </Dropdown>
          </div>
        </div>
      </div>
    </Table>
  </div>
</div>
<slot />

<style>
  .role {
    flex: 0 0 300px;
  }
</style>
