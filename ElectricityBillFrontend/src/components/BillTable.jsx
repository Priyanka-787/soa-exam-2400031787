export default function BillTable({ bills, loading, onDelete }) {
  if (loading) return <p className="empty">Loading...</p>;
  if (!bills.length) return <p className="empty">No bills found. Please add a new bill.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Consumer</th>
            <th>Month</th>
            <th className="num">Amount</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {bills.map((b) => (
            <tr key={b.id}>
              <td>#{b.id}</td>
              <td>{b.consumerName}</td>
              <td>{b.billingMonth}</td>
              <td className="num">₹{Number(b.amount).toFixed(2)}</td>
              <td>
                <span className={`badge ${b.paid ? "paid" : "unpaid"}`}>
                  {b.paid ? "Paid" : "Unpaid"}
                </span>
              </td>
              <td>
                <button className="btn danger sm" onClick={() => onDelete(b.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
