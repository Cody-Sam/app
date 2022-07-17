import { useState, useEffect } from "react";

function gradientString(gradientStart) {
  return `conic-gradient(
    hsl(${gradientStart}, 100%, 50%),
    hsl(${gradientStart + 30}, 100%, 50%),
    hsl(${gradientStart + 60}, 100%, 50%),
    hsl(${gradientStart + 90}, 100%, 50%),
    hsl(${gradientStart + 120}, 100%, 50%),
    hsl(${gradientStart + 150}, 100%, 50%),
    hsl(${gradientStart + 180}, 100%, 50%),
    hsl(${gradientStart + 210}, 100%, 50%),
    hsl(${gradientStart + 240}, 100%, 50%),
    hsl(${gradientStart + 270}, 100%, 50%),
    hsl(${gradientStart + 300}, 100%, 50%),
    hsl(${gradientStart + 330}, 100%, 50%),
    hsl(${gradientStart + 360}, 100%, 50%))`;
}

function GlowCard({ children }) {
  const [gradientStart, setGradientStart] = useState(0);
  const [gradientStyle, setGradientStyle] = useState({
    background: gradientString(gradientStart),
  });
  children = Array.isArray(children) ? children : [children];
  const header =
    children.find((child) => child.type.displayName === "header") || null;
  const body =
    children.find((child) => child.type.displayName === "body") || null;
  const footer =
    children.find((child) => child.type.displayName === "footer") || null;
  const media =
    children.find((child) => child.type.displayName === "media") || null;

  useEffect(() => {
    const intervalID = setInterval(() => {
      setGradientStart((prevGradientStart) => (prevGradientStart + 1) % 360);
    }, 10);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    setGradientStyle({
      background: gradientString(gradientStart)
    });
  }, [gradientStart]);

  return (
    <div className="relative">
      {/* Content */}
      <div className="relative bg-black rounded-lg flex flex-col md:flex-row overflow-hidden z-10">
        {/* Media Block */}
        {media && <div className="h-64 w-auto">{media}</div>}
        <div className="w-full py-4 px-8 flex flex-col justify-between">
          {/* Text Block */}
          {header && <div className="">{header}</div>}
          <div className="z-20">{body}</div>
          {footer && <div className="z-20">{footer}</div>}
          <div className="absolute left-0 h-full w-4 skew-x-[45deg] bg-gray-500"></div>
          <div className="absolute -left-8 h-full w-4 skew-x-[45deg] bg-gray-500"></div>
        </div>
      </div>
      {/* End Content */}
      <div
        style={gradientStyle}
        className="absolute -inset-0.5 rounded-lg bg-red-500 z-0"
      ></div>
      <div
        style={gradientStyle}
        className="absolute top-0 left-0 w-full h-full filter blur-xl"
      ></div>
      <div
        style={gradientStyle}
        className="absolute top-0 w-full h-full filter blur-3xl opacity-60 animate-pulse"
      ></div>
    </div>
  );
}

function Header({ children }) {
  return children;
}
Header.displayName = "header";
GlowCard.Header = Header;

function Body({ children }) {
  return children;
}
Body.displayName = "body";
GlowCard.Body = Body;

function Footer({ children }) {
  return children;
}
Footer.displayName = "footer";
GlowCard.Footer = Footer;

function Media({ src }) {
  return (
    <img
      src={src}
      className="inset-0 h-full w-full object-cover object-center"
    />
  );
}
Media.displayName = "media";
GlowCard.Media = Media;

export default GlowCard;
