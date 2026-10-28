
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Plus,
  Download,
  Search,
  CalendarDays,
  Menu,
  X,
  IndianRupee,
  TrendingUp,
  ShoppingCart,
  Package,
} from "lucide-react";

import Sidebar from "./Components/Sidebar";
import StatCard from "./Components/Statcard";
import SalesChart from "./Components/Saleschart";
import SalesTable from "./Components/Salestable";
import SalesForm from "./Components/Salesform";

import "./App.css";

// Express backend API
const API_URL = "http://localhost:5000/api/sales";

// Sample data for testing before the backend is ready
const initialSales = [
  {
    _id: "1",
    product: "Laptop",
    category: "Electronics",
    quantity: 2,
    sales: 120000,
    profit: 18000,
    date: "2026-10-02",
  },
  {
    _id: "2",
    product: "Headphones",
    category: "Accessories",
    quantity: 5,
    sales: 15000,
    profit: 4500,
    date: "2026-10-05",
  },
  {
    _id: "3",
    product: "Keyboard",
    category: "Accessories",
    quantity: 4,
    sales: 8000,
    profit: 2400,
    date: "2026-10-08",
  },
  {
    _id: "4",
    product: "Monitor",
    category: "Electronics",
    quantity: 3,
    sales: 45000,
    profit: 9000,
    date: "2026-10-12",
  },
  {
    _id: "5",
    product: "Mobile",
    category: "Electronics",
    quantity: 4,
    sales: 80000,
    profit: 12000,
    date: "2026-10-15",
  },
  {
    _id: "6",
    product: "Office Chair",
    category: "Furniture",
    quantity: 2,
    sales: 18000,
    profit: 5000,
    date: "2026-10-20",
  },
  {
    _id: "7",
    product: "Mouse",
    category: "Accessories",
    quantity: 10,
    sales: 10000,
    profit: 3500,
    date: "2026-10-23",
  },
];

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const emptyForm = {
  product: "",
  category: "Electronics",
  quantity: "1",
  sales: "",
  profit: "",
  date: new Date().toISOString().slice(0, 10),
};

function App() {
  const [salesData, setSalesData] = useState(initialSales);

  const [apiConnected, setApiConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch sales from the backend.
  useEffect(() => {
    let active = true;

    async function fetchSales() {
      try {
        const response = await axios.get(API_URL);

        const records = Array.isArray(response.data)
          ? response.data
          : response.data.sales;

        if (!active) return;

        if (Array.isArray(records)) {
          setSalesData(records);
          setApiConnected(true);
        } else {
          setApiConnected(false);
        }
      } catch {
        // Continue using sample data if the backend is unavailable.
        if (active) {
          setApiConnected(false);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchSales();

    return () => {
      active = false;
    };
  }, []);

  // Search, date and category filters.
  const filteredSales = useMemo(() => {
    return salesData.filter((item) => {
      const product = String(item.product || "").toLowerCase();
      const itemCategory = String(item.category || "");
      const date = String(item.date || "").slice(0, 10);

      const matchesSearch =
        `${product} ${itemCategory.toLowerCase()}`.includes(
          search.toLowerCase()
        );

      const matchesStart = !startDate || date >= startDate;
      const matchesEnd = !endDate || date <= endDate;
      const matchesCategory =
        category === "All" || itemCategory === category;

      return (
        matchesSearch &&
        matchesStart &&
        matchesEnd &&
        matchesCategory
      );
    });
  }, [salesData, search, startDate, endDate, category]);

  // Calculate dashboard totals.
  const stats = useMemo(() => {
    const totalSales = filteredSales.reduce(
      (sum, item) => sum + Number(item.sales || 0),
      0
    );

    const totalProfit = filteredSales.reduce(
      (sum, item) => sum + Number(item.profit || 0),
      0
    );

    const totalOrders = filteredSales.length;

    return {
      totalSales,
      totalProfit,
      totalOrders,
      averageOrder: totalOrders
        ? totalSales / totalOrders
        : 0,
    };
  }, [filteredSales]);

  // Prepare monthly sales and profit chart data.
  const chartData = useMemo(() => {
    const months = {};

    filteredSales.forEach((item) => {
      const date = String(item.date || "").slice(0, 10);
      if (date.length < 7) return;

      const month = date.slice(0, 7);

      if (!months[month]) {
        months[month] = {
          month,
          sales: 0,
          profit: 0,
        };
      }

      months[month].sales += Number(item.sales || 0);
      months[month].profit += Number(item.profit || 0);
    });

    return Object.values(months)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((item) => ({
        ...item,
        month: new Date(
          item.month + "-02T00:00:00"
        ).toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
      }));
  }, [filteredSales]);

  // Prepare category chart data.
  const categoryData = useMemo(() => {
    const groups = {};

    filteredSales.forEach((item) => {
      const name = item.category || "Other";

      groups[name] =
        (groups[name] || 0) + Number(item.sales || 0);
    });

    return Object.entries(groups).map(([name, value]) => ({
      name,
      value,
    }));
  }, [filteredSales]);

  // Open the form to add a record.
  function openAddForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      date: new Date().toISOString().slice(0, 10),
    });
    setError("");
    setNotice("");
    setShowForm(true);
  }

  // Open the form to edit a record.
  function openEditForm(item) {
    setEditingId(item._id);

    setForm({
      product: item.product || "",
      category: item.category || "Electronics",
      quantity: String(item.quantity ?? 1),
      sales: String(item.sales ?? ""),
      profit: String(item.profit ?? ""),
      date: String(item.date || "").slice(0, 10),
    });

    setError("");
    setNotice("");
    setShowForm(true);
  }

  // Create or update a sales record.
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setNotice("");

    const payload = {
      product: form.product.trim(),
      category: form.category,
      quantity: Number(form.quantity),
      sales: Number(form.sales),
      profit: Number(form.profit),
      date: form.date,
    };

    if (
      !payload.product ||
      !payload.date ||
      !Number.isFinite(payload.quantity) ||
      !Number.isFinite(payload.sales) ||
      !Number.isFinite(payload.profit) ||
      !Number.isInteger(payload.quantity) ||
      payload.quantity < 1 ||
      payload.sales < 0 ||
      payload.profit < 0
    ) {
      setError("Please enter valid product details and amounts.");
      return;
    }

    if (payload.profit > payload.sales) {
      setError("Profit cannot be greater than sales.");
      return;
    }

    try {
      if (apiConnected) {
        if (editingId) {
          const response = await axios.put(
            `${API_URL}/${editingId}`,
            payload
          );

          const updated = response.data.sale || response.data;

          setSalesData((previous) =>
            previous.map((item) =>
              String(item._id) === String(editingId)
                ? updated
                : item
            )
          );
        } else {
          const response = await axios.post(API_URL, payload);

          const created = response.data.sale || response.data;

          setSalesData((previous) => [created, ...previous]);
        }
      } else {
        // Demo mode: records exist only in React state.
        if (editingId) {
          setSalesData((previous) =>
            previous.map((item) =>
              String(item._id) === String(editingId)
                ? { ...payload, _id: editingId }
                : item
            )
          );
        } else {
          setSalesData((previous) => [
            { ...payload, _id: `local-${Date.now()}` },
            ...previous,
          ]);
        }
      }

      setShowForm(false);
      setNotice(
        apiConnected
          ? "Sales record saved successfully."
          : "Record saved in demo mode. It will not persist after refresh."
      );
    } catch {
      setError("Could not save the record. Check your backend API.");
    }
  }

  // Delete a sales record.
  async function deleteSale(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this sales record?"
    );

    if (!confirmed) return;

    setError("");
    setNotice("");

    try {
      if (apiConnected) {
        await axios.delete(`${API_URL}/${id}`);
      }

      setSalesData((previous) =>
        previous.filter(
          (item) => String(item._id) !== String(id)
        )
      );

      setNotice(
        apiConnected
          ? "Sales record deleted successfully."
          : "Record deleted in demo mode."
      );
    } catch {
      setError("Could not delete the record. Check your backend API.");
    }
  }

  // Export filtered records to CSV.
  function exportCSV() {
    const columns = [
      "Product",
      "Category",
      "Quantity",
      "Sales",
      "Profit",
      "Date",
    ];

    const rows = filteredSales.map((item) => [
      item.product,
      item.category,
      item.quantity,
      item.sales,
      item.profit,
      String(item.date || "").slice(0, 10),
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [columns, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "business-sales-report.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  function resetFilters() {
    setSearch("");
    setStartDate("");
    setEndDate("");
    setCategory("All");
  }

  return (
    <div className="app-shell">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Mobile menu button */}
      <button
        className="menu-button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle navigation"
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {sidebarOpen && (
        <div
          className="mobile-sidebar-wrapper"
          onClick={() => setSidebarOpen(false)}
        >
          <Sidebar />
        </div>
      )}

      <main className="main-content" id="overview">
        <header className="topbar">
          <div>
            <p className="eyebrow">BUSINESS MANAGEMENT</p>
            <h1>Dashboard Overview</h1>
          </div>

          <div className="topbar-right">
            <span
              className={`connection-dot ${
                apiConnected ? "connected" : ""
              }`}
            />

            <span className="connection-label">
              {apiConnected ? "MongoDB connected" : "Demo data"}
            </span>

            <div className="avatar">SA</div>
          </div>
        </header>

        <section className="welcome-row">
          <div>
            <h2>Your business at a glance</h2>
            <p>
              Monitor sales, profits and performance in one place.
            </p>
          </div>

          <button
            className="primary-button"
            onClick={openAddForm}
          >
            <Plus size={18} />
            Add sales record
          </button>
        </section>

        {error && (
          <div className="alert error-alert">{error}</div>
        )}

        {notice && (
          <div className="alert success-alert">{notice}</div>
        )}

        {/* Summary cards */}
        <section className="stats-grid">
          <StatCard
            title="Total sales"
            value={money(stats.totalSales)}
            icon={<IndianRupee size={21} />}
            color="purple"
            change="Revenue generated"
          />

          <StatCard
            title="Total profit"
            value={money(stats.totalProfit)}
            icon={<TrendingUp size={21} />}
            color="green"
            change="Profit recorded"
          />

          <StatCard
            title="Total orders"
            value={stats.totalOrders.toLocaleString("en-IN")}
            icon={<ShoppingCart size={21} />}
            color="orange"
            change="Sales transactions"
          />

          <StatCard
            title="Average order"
            value={money(stats.averageOrder)}
            icon={<Package size={21} />}
            color="blue"
            change="Average sales per record"
          />
        </section>

        {/* Sales and category charts */}
        <SalesChart
          chartData={chartData}
          categoryData={categoryData}
        />

        {/* Search and date filters */}
        <section className="panel records-panel" id="sales">
          <div className="records-heading">
            <div>
              <h3>Sales records</h3>
              <p>Manage your business transactions</p>
            </div>

            <button
              className="secondary-button"
              onClick={exportCSV}
            >
              <Download size={17} />
              Export CSV
            </button>
          </div>

          <div className="filters">
            <div className="search-box">
              <Search size={17} />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
              />
            </div>

            <div className="date-filter">
              <CalendarDays size={16} />

              <input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
                aria-label="Start date"
              />
            </div>

            <span className="date-separator">to</span>

            <div className="date-filter">
              <CalendarDays size={16} />

              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(e) => setEndDate(e.target.value)}
                aria-label="End date"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Furniture">Furniture</option>
            </select>

            <button
              className="reset-button"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          {loading && (
            <p style={{ padding: "0 22px", color: "#8b90a2" }}>
              Checking backend connection...
            </p>
          )}

          {/* Reusable table component */}
          <SalesTable
            sales={filteredSales}
            onEdit={openEditForm}
            onDelete={deleteSale}
          />
        </section>

        <footer className="page-footer">
          <span>© 2026 BizInsights</span>
          <span>Business Analytics Dashboard</span>
        </footer>
      </main>

      {/* Reusable add/edit form */}
      <SalesForm
        show={showForm}
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onClose={() => {
          setShowForm(false);
          setError("");
        }}
        editingId={editingId}
        error={error}
      />
    </div>
  );
}

export default App;
