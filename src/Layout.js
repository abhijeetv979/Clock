import { useEffect } from "react";

// Layout Component
function Layout({ children }) {

  useEffect(() => {

    const script = document.createElement("script");

    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6330093427541658";
    script.async = true;
    script.crossOrigin = "anonymous";

    document.head.appendChild(script);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
    catch (err) {

    }
  }, [])

  return (
    <div className="layout">
      <div className="add-area">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', height: '100%', width: '100%' }}
          data-ad-client="ca-pub-6330093427541658"
          data-ad-slot="7585753696"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
      </div>
      <div className="main-content">{children}</div>
    </div>
  );
}

export default Layout;