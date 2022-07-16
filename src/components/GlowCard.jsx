// function GlowCard({ height = 48, children }) {
//   return (
//     <div className={`flex relative max-w-md w-full mx-4 h-48`}>
//       <div className="absolute z-10 w-full h-full flex justify-center items-center bg-black overflow-hidden">
//         <div className="z-30">{children}</div>

//         <div className="absolute left-0 h-full w-4 skew-x-[45deg] bg-gray-500"></div>
//         <div className="absolute -left-8 h-full w-4 skew-x-[45deg] bg-gray-500"></div>
//       </div>
// <div className="absolute w-full h-full bg-conic-gradient filter blur-xl"></div>
// <div className="absolute w-full h-full bg-conic-gradient filter blur-3xl opacity-60 animate-pulse"></div>
// <div className="absolute -inset-0.5 rounded-sm bg-conic-gradient"></div>
//     </div>
//   );
// }

function GlowCard({ children }) {
  children = typeof children === "object" ? [children] : children;
  const header =
    children.find((child) => child.type.displayName === "header") || null;
  const body =
    children.find((child) => child.type.displayName === "body") || null;
  const footer =
    children.find((child) => child.type.displayName === "footer") || null;
  const media =
    children.find((child) => child.type.displayName === "media") || null;

  let gradientStart = 0;

  const style = {
    background:
      `conic-gradient(hsl(${gradientStart}, 100%, 50%),hsl(${gradientStart+30}, 100%, 50%),hsl(${gradientStart+60}, 100%, 50%),hsl(${gradientStart+90}, 100%, 50%),hsl(${gradientStart+120}, 100%, 50%),hsl(${gradientStart+150}, 100%, 50%),hsl(${gradientStart+180}, 100%, 50%),hsl(${gradientStart+210}, 100%, 50%),hsl(${gradientStart+240}, 100%, 50%),hsl(${gradientStart+270}, 100%, 50%),hsl(${gradientStart+300}, 100%, 50%),hsl(${gradientStart+330}, 100%, 50%),hsl(${gradientStart+360}, 100%, 50%))`,
  };

  return (
    <div className="relative">
      {/* Content */}
      <div className="relative bg-black rounded-lg flex flex-col md:flex-row overflow-hidden z-10">
        {media && <div className="h-64 w-auto">{media}</div>}
        <div className="w-full py-4 px-8 flex flex-col justify-between">
          {header && <div className="">{header}</div>}
          <div className="">{body}</div>
          {footer && <div>{footer}</div>}
        </div>
      </div>
      {/* End Content */}
      <div
        style={style}
        className="absolute -inset-0.5 rounded-lg bg-red-500 z-0"
      >
        {" "}
      </div>
      <div> </div>
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
