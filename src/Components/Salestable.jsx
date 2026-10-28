
import { Package, Pencil, Trash2 } from "lucide-react";

function Salestable({ sales, onEdit, onDelete }) {
  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const formatDate = (date) =>
    new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="panel records-panel" id="sales">
      <div className="records-heading">
        <div>
          <h3>Sales Records</h3>
          <p>Manage your business transactions</p>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>CATEGORY</th>
              <th>QUANTITY</th>
              <th>SALES</th>
              <th>PROFIT</th>
              <th>DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {sales.length > 0 ? (
              sales.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="product-cell">
                      <div className="product-icon">
                        <Package size={17} />
                      </div>
                      <strong>{item.product}</strong>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`category-badge ${item.category.toLowerCase()}`}
                    >
                      {item.category}
                    </span>
                  </td>

                  <td>{item.quantity}</td>
                  <td className="amount-cell">
                    {money(item.sales)}
                  </td>
                  <td className="profit-cell">
                    {money(item.profit)}
                  </td>
                  <td>{formatDate(item.date.slice(0, 10))}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="icon-button edit-button"
                        onClick={() => onEdit(item)}
                        aria-label={`Edit ${item.product}`}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="icon-button delete-button"
                        onClick={() => onDelete(item._id)}
                        aria-label={`Delete ${item.product}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-table">
                  No sales records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        Showing <strong>{sales.length}</strong> records
      </div>
    </section>
  );
}

export default Salestable;
