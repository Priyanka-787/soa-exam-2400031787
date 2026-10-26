import { useCallback, useEffect, useMemo, useState } from "react";
import { addBill, deleteBill, getBills } from "./api.js";
import Stats from "./components/Stats.jsx";
import BillForm from "./components/BillForm.jsx";
import BillTable from "./components/BillTable.jsx";

export default function App() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const notify = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setBills(await getBills());
    } catch (e) {
      setError(
        "Backend ki connect avvaledu. Spring Boot app (port 8081) run avutundo ledo check cheyandi."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (bill) => {
    try {
      const saved = await addBill(bill);
      setBills((prev) => [...prev, saved]);
      notify("success", "Bill add ayyindi ✅");
      return true;
    } catch (e) {
      notify("error", e.message);
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Bill #${id} ni delete cheyyalani confirm aa?`)) return;
    try {
      await deleteBill(id);
      setBills((prev) => prev.filter((b) => b.id !== id));
      notify("success", `Bill #${id} delete ayyindi 🗑️`);
    } catch (e) {
      notify("error", e.message);
    }
  };

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bills.filter((b) => {
      const matchText =
        !q ||
        (b.consumerName || "").toLowerCase().includes(q) ||
        (b.billingMonth || "").toLowerCase().includes(q);
      const matchFilter =
        filter === "all" || (filter === "paid" ? b.paid : !b.paid);
      return matchText && matchFilter;
    });
  }, [bills, search, filter]);

  return (
    <div className="container">
      <header className="header">
        <h1>⚡ Electricity Bill Manager</h1>
        <button className="btn ghost" onClick={load} disabled={loading}>
          {loading ? "Loading..." : "↻ Refresh"}
        </button>
      </header>

      {error && <div className="banner error">{error}</div>}

      <Stats bills={bills} />

      <div className="grid">
        <BillForm onAdd={handleAdd} />

        <section className="card">
          <div className="toolbar">
            <h2>All Bills ({visible.length})</h2>
            <div className="controls">
              <input
                type="search"
                placeholder="Search name / month..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
          </div>
          <BillTable bills={visible} loading={loading} onDelete={handleDelete} />
        </section>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}
