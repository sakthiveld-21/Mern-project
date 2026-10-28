
import {
  LayoutDashboard,
  ShoppingCart,
  ChartNoAxesCombined,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <ChartNoAxesCombined size={23} />
        </div>
        <span>BizInsights</span>
      </div>

      <p className="nav-label">WORKSPACE</p>

      <nav className="navigation">
        <a href="#overview" className="nav-item active">
          <LayoutDashboard size={19} />
          Overview
        </a>

        <a href="#sales" className="nav-item">
          <ShoppingCart size={19} />
          Sales records
        </a>

        <a href="#analytics" className="nav-item">
          <ChartNoAxesCombined size={19} />
          Analytics
        </a>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <strong>Business insights</strong>
          <p>Track your sales and make smarter decisions.</p>
        </div>

        <p className="sidebar-footer">
          BUSINESS DASHBOARD · v1.0
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
