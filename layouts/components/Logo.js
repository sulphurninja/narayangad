import ImageFallback from "@components/ImageFallback";
import config from "@config/config.json";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Logo = ({ src }) => {
  // destructuring items from config object
  const { logo, logo_white, logo_width, logo_height, logo_text, title } =
    config.site;
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Link href="/" className="navbar-brand">
      {src || logo ? (
        <ImageFallback
          width={logo_width.replace("px", "") * 2}
          height={logo_height.replace("px", "") * 2}
          src={
            mounted && (theme === "dark" || resolvedTheme === "dark")
              ? logo_white
              : logo
          }
          alt={title}
          priority
          className={"m-auto h-12 w-32 lg:h-16 lg:w-52 "}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
