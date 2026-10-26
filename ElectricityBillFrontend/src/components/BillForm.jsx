import { useState } from "react";

const empty = { consumerName: "", billingMonth: "", amount: "", paid: false };

export default function BillForm({ onAdd }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) =>
    setForm({
      ...form,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const ok = await onAdd({
      consumerName: form.consumerName.trim(),
      billingMonth: form.billingMonth,
      amount: parseFloat(form.amount),
      paid: form.paid,
    });
    setSaving(false);
    if (ok) setForm(empty);
  };

  return (
    <section className="card">
      <h2>Add New Bill</h2>
      <form onSubmit={submit} className="form">
        <label>
          Consumer Name
          <input
            required
            value={form.consumerName}
            onChange={set("consumerName")}
            placeholder="e.g. Priyanka"
          />
        </label>
        <label>
          Billing Month
          <input
            required
            type="month"
            value={form.billingMonth}
            onChange={set("billingMonth")}
          />
        </label>
        <label>
          Amount (₹)
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={form.amount}
            onChange={set("amount")}
            placeholder="0.00"
          />
        </label>
        <label className="check">
          <input type="checkbox" checked={form.paid} onChange={set("paid")} />
          Paid
        </label>
        <button className="btn primary" disabled={saving}>
          {saving ? "Saving..." : "+ Add Bill"}
        </button>
      </form>
    </section>
  );
}
