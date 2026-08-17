import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-sm shadow-blue-200">
            J
          </div>

          <span className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
            Job<span className="text-blue-600">Finder</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 md:flex">

          <Link
            to="/"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            Jobs
          </Link>

          <Link
            to="/saved"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
          >
            ♡ Saved
          </Link>

        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 md:hidden"
        >
          {menuOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <span className="text-xl">☰</span>
          )}
        </button>

      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">

          <div className="flex flex-col gap-1">

            <Link
              to="/"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              🏠 Home
            </Link>

            <Link
              to="/jobs"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              💼 Jobs
            </Link>

            <Link
              to="/saved"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
            >
              ♡ Saved Jobs
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;