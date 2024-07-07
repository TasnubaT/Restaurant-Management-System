import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
          <Link to="/">
            <img className="w-60" src="/public/logo.png" alt="" />
          </Link>
          <p>
            <span className="text-xl mb-2 mt-2  font-semibold">
              Spice Lounge Ltd.
            </span>
          </p>
          <p>
            <span className=" mb-2 mt-2">
              Savor the Moment, Taste the Tradition
            </span>
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
