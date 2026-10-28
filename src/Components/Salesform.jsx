
import { X } from "lucide-react";

function Salesform({
  show,
  form,
  setForm,
  onSubmit,
  onClose,
  editingId,
  error,
}) {
  if (!show) return null;

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  return (
    <div className="modal-backdrop">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sales-form-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="sales-form-title">
              {editingId ? "Edit Sales Record" : "Add Sales Record"}
            </h2>
            <p>Enter your transaction details.</p>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <label>
            Product Name
            <input
              type="text"
              name="product"
              value={form.product}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              maxLength={100}
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
            </select>
          </label>

          <div className="form-two-columns">
            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                min="1"
                step="1"
                required
              />
            </label>

            <label>
              Sales Amount (₹)
              <input
                type="number"
                name="sales"
                value={form.sales}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </label>
          </div>

          <div className="form-two-columns">
            <label>
              Profit (₹)
              <input
                type="number"
                name="profit"
                value={form.profit}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </label>

            <label>
              Transaction Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {error && (
            <div className="alert error-alert">
              {error}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {editingId ? "Save Changes" : "Add Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Salesform;
