<script>
  import { goto, params } from "@roxi/routify";
  import Modal from "__@comps/Modal.svelte";
  import Loader from "__@comps/loader/Loader.svelte";
  import CellRp from "__@comps/CellRp.svelte";
  import CellAccount from "__@comps/account/CellAccount.svelte";

  export let backUrl;
  export let transaction;

  function closeHandler() {
    $goto(backUrl, {});
  }
</script>

<Modal title={($params.id && `Detail Transaksi '${$params.id}'`) || ""} class="modal-lg">
  {#if transaction}
    <dl class="row">
      <dt class="col-sm-3">No. Bukti/Kwitansi</dt>
      <p class="col-sm-9">: {transaction.no || "-"}</p>
      <dt class="col-sm-3">Tanggal</dt>
      <p class="col-sm-9">: {transaction.date || "-"}</p>
      <dt class="col-sm-3">Deskripsi</dt>
      <p class="col-sm-9">: {transaction.description || "-"}</p>
      <dt class="col-sm-3">Status</dt>
      <p class="col-sm-9">
        :
        <span
          class="badge"
          class:badge-warning={transaction.status === "UNAPPROVED"}
          class:badge-success={transaction.status === "APPROVED"}>{transaction.status || ""}</span
        >
      </p>
    </dl>

    <table class="table">
      <thead>
        <tr>
          <th style="width: 100px">Kode</th>
          <th>Akun Perkiraan</th>
          <th style="width: 150px">Jumlah Debit</th>
          <th style="width: 150px">Jumlah Kredit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{transaction.accountId || "-"}</td>
          <td><CellAccount id={transaction.accountId} /></td>
          <td><CellRp value={transaction.amount} /></td>
          <td class="text-right">-</td>
        </tr>
        {#each transaction.accounts as journalAccount, index (journalAccount.index)}
          <tr>
            <td>{journalAccount.accountId || "-"}</td>
            <td><CellAccount id={journalAccount.accountId} /></td>
            <td class="text-right">-</td>
            <td><CellRp value={journalAccount.amount} /></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <Loader />
  {/if}
  <svelte:fragment slot="footer">
    <button type="button" class="btn btn-outline bg-primary text-primary border-primary" on:click={closeHandler}>
      Close
    </button>
  </svelte:fragment>
</Modal>