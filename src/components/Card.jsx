import React from "react";

function Card({ children }) {
  const header =
    children.find((child) => child.type.displayName === "header") || null;
  const body =
    children.find((child) => child.type.displayName === "body") || null;
  const footer =
    children.find((child) => child.type.displayName === "footer") || null;
  const media =
    children.find((child) => child.type.displayName === "media") || null;
  console.log(children);
  console.log(React.Children);

  return (
    <div className="bg-black ring ring-white rounded-lg flex flex-col md:flex-row overflow-hidden">
      {media && <div className="h-64 w-auto">{media}</div>}
      <div className="w-full py-4 px-8 flex flex-col justify-between">
        {header && <div className="">{header}</div>}
        <div className="">{body}</div>
        {footer && <div>{footer}</div>}
      </div>
    </div>
  );
}

function Header({ children }) {
  return children;
}
Header.displayName = "header";
Card.Header = Header;

function Body({ children }) {
  return children;
}
Body.displayName = "body";
Card.Body = Body;

function Footer({ children }) {
  return children;
}
Footer.displayName = "footer";
Card.Footer = Footer;

function Media({ src }) {
  return <img src={src} className="inset-0 h-full w-full object-cover object-center" />;
}
Media.displayName = "media";
Card.Media = Media;

export default Card;
