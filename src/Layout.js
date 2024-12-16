
// Layout Component
function Layout({ children }) {
  return (
    <div className="layout">
      <div className="ad-area">Ad Space</div>
      <div className="main-content">{children}</div>
    </div>
  );
}

export default Layout;