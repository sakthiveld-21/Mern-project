
function Statcard({ title, value, icon, color, change }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>

      <p className="stat-title">{title}</p>

      <h2>{value}</h2>

      <p className="stat-change">{change}</p>
    </div>
  );
}

export default Statcard;
