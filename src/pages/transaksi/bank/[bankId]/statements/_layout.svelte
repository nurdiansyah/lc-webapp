<!--routify:options title="Rekonsiliasi detail"-->
<script>
  import { sortUtilsFunc } from "__@root/utils";
  import { url, params } from "@roxi/routify";
  import { getBreadcrumbStore } from "__@stores/breadcrumb";
  import PageLayout from "__@root/layout/PageLayout.svelte";
  import { createBankStatementContext, getBankContext } from "__@modules/accounting";
  import { getApplicationContext } from "__@modules/app";

  import TableStatementBank from "./_components/TableStatementBank.svelte";
  // import DatePickr from "__@comps/DatePickr.svelte";

  const { setBreadcrumbContext, breadcrumbStore } = getBreadcrumbStore();
  setBreadcrumbContext({ path: $url("./"), title: "Rekonsiliasi Detail" });
  const { notify, loading: loadingApp } = getApplicationContext();

  let loading = true;
  const { getBank } = getBankContext();
  const { findStatement, bank, reconcile, bankStatementStore } = createBankStatementContext(getBank($params.bankId));
  let itemsSelected;
  $: bankStatementList = $bankStatementStore;

  $: console.log($bankStatementStore);

  if ($bank.id && loading) {
    findStatement($bank.id, {}).then(() => {
      loading = false;
    });
  }

  async function reconcileHandler() {
    $loadingApp = true;
    try {
      // filter
      const statements = [];
      let index = 0;
      for (const { status, ...statement } of bankStatementList) {
        if ($itemsSelected.includes(index)) {
          if (!statement.accountId) {
            throw new Error(`Statement "${statement.description}" akun masih belum terisi`);
          }
          statements.push(statement);
        }
        index++;
      }
      statements.sort(sortUtilsFunc("id", "desc"));
      if (statements.length > 0) {
        const result = await reconcile(statements);
        statements.forEach((_, index) => {
          statements[index] = result[index];
        });
        // reset check all
        $itemsSelected = [];
        notify("reconcile data bank telah berhasil", "success");
      } else {
        notify("Belum ada data yang dipillih", "error");
      }
    } catch (e) {
      // console.error(e);
      // notify(e.message, "error");
    } finally {
      $loadingApp = false;
    }
  }
</script>

<PageLayout breadcrumb={[]}>
  <div class="header-elements" slot="header-elements">
    <div class="list-icons">
      <!--      <DatePickr id="date" name="date" class="form-control" placeholder="Tanggal" />-->
      <a href={$url("./import")} class="btn bg-slate btn-icon"><i class="icon-import mr-2" />Import CSV</a>
      <a href="/#" class="btn bg-slate" target="_self" on:click|preventDefault={reconcileHandler}
        ><i class="icon-safe mr-2" />Reconcile</a
      >
    </div>
  </div>
  <div class="card flex-column flex-1 d-flex">
    <div class="card-body d-flex flex-column flex-1">
      <TableStatementBank bind:loading bind:itemsSelected bind:bankStatementList />
    </div>
  </div>
</PageLayout>
<slot />