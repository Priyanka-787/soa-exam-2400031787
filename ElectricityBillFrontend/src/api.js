
async function handle(res) {
  const text = await res.text();

  if (!res.ok) {
    throw new Error(text || `Request failed (${res.status})`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export const getBills = () =>
  fetch("/DisplayAll").then(handle);

export const addBill = (bill) =>
  fetch("/Add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  }).then(handle);

export const deleteBill = (id) =>
  fetch(`/Delete/${id}`, {
    method: "DELETE",
  }).then(handle);