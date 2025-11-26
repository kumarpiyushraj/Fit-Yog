import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import homeBg from "../assets/images/yoga-bg-2.jpg";
import aboutBg from "../assets/images/yoga-bg-2.jpg";
import classesBg from "../assets/images/yoga-bg-2.jpg";
import reviewsBg from "../assets/images/yoga-bg-2.jpg";
import videosBg from "../assets/images/yoga-bg-2.jpg";
import defaultBg from "../assets/images/yoga-bg-2.jpg";

function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    let bgImage;

    switch (location.pathname) {
      case "/":
        bgImage = homeBg;
        break;
      case "/about":
        bgImage = aboutBg;
        break;
      case "/classes":
        bgImage = classesBg;
        break;
      case "/reviews":
        bgImage = reviewsBg;
        break;
      case "/videos":
        bgImage = videosBg;
        break;
      default:
        bgImage = defaultBg;
    }

    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, [location]);

  return <>{children}</>;
}

export default Layout;