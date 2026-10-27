
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
        "Unable to connect to the backend. Please check whether the Spring Boot application is running on port 8081."
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
      notify("success", "Bill added successfully!");
      return true;
    } catch (e) {
      notify("error", e.message || "Failed to add the bill. Please try again.");
      return false;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete Bill #${id}?`)) return;
    try {
      await deleteBill(id);
      setBills((prev) => prev.filter((b) => b.id !== id));
      notify("success", `Bill #${id} deleted successfully!`);
    } catch (e) {
      notify("error", e.message || "Failed to delete the bill. Please try again.");
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
                placeholder="Search by name or month..."
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
