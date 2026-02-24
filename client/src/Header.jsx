import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <nav>
      <Link to="/">
        <img
          src="/client/src/images/cover-img.png"
          alt="cover-image"
          className="logo img"
        />
      </Link>
    </nav>
  );
}
