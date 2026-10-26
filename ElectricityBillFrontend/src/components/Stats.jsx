const fmt = (n) =>
  "₹" + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });

export default function Stats({ bills }) {
  const total = bills.reduce((s, b) => s + (b.amount || 0), 0);
  const paid = bills.filter((b) => b.paid).reduce((s, b) => s + (b.amount || 0), 0);
  const items = [
    { label: "Total Bills", value: bills.length },
    { label: "Total Amount", value: fmt(total) },
    { label: "Paid", value: fmt(paid), cls: "ok" },
    { label: "Pending", value: fmt(total - paid), cls: "warn" },
  ];
  return (
    <div className="stats">
      {items.map((i) => (
        <div key={i.label} className={`stat ${i.cls || ""}`}>
          <span>{i.label}</span>
          <strong>{i.value}</strong>
        </div>
      ))}
    </div>
  );
}
