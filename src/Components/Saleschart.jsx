
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const colors = [
  "#6558f5",
  "#22b8a0",
  "#f5a623",
  "#e879a9",
  "#6b9df8",
];

function Saleschart({ chartData, categoryData }) {
  const money = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  return (
    <section className="charts-grid" id="analytics">
      <div className="panel chart-panel">
        <div className="panel-heading">
          <div>
            <h3>Sales &amp; Profit Trends</h3>
            <p>Business performance over time</p>
          </div>
        </div>

        <div className="chart-container">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis dataKey="month" />

                <YAxis
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `${Math.round(value / 1000)}k`
                      : value
                  }
                />

                <Tooltip
                  formatter={(value) => money(value)}
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  name="Sales"
                  stroke="#6558f5"
                  fill="#efedff"
                />

                <Area
                  type="monotone"
                  dataKey="profit"
                  name="Profit"
                  stroke="#22b8a0"
                  fill="#e3f8f1"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p>No chart data available.</p>
          )}
        </div>
      </div>

      <div className="panel category-panel">
        <div className="panel-heading">
          <div>
            <h3>Sales by Category</h3>
            <p>Revenue distribution</p>
          </div>
        </div>

        <div className="pie-container">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={4}
                >
                  {categoryData.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => money(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No category data available.</p>
          )}
        </div>

        <div className="category-legend">
          {categoryData.map((item, index) => (
            <div
              className="category-legend-item"
              key={item.name}
            >
              <span
                className="category-dot"
                style={{
                  background: colors[index % colors.length],
                }}
              />

              <span>{item.name}</span>

              <strong>{money(item.value)}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Saleschart;
