import '../styles/navbar.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-black navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/images/logo.png" alt="Logo" height="50" className="ms-3" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item me-3">
                            <a className="nav-link" href="/Games">Games</a>
                        </li>
                        <li className="nav-item me-3">
                            <a className="nav-link" href="/News">News</a>
                        </li>
                        <li className="nav-item me-3">
                            <a className="nav-link" href="/merch">Merch</a>
                        </li>
                        <li className="nav-item me-3">
                            <a className="nav-link" href="/Hiring">We're Hiring</a>
                        </li>
                        <li className="nav-item me-3">
                            <a className="nav-link" href="/Contact">Contact</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-3">
                        <button className="nav-item bg-danger text-white border border-0 ms-5">
                            <a className="nav-link" href="#"><i className="fa-brands fa-discord"></i> JOIN OUR DISCORD</a>
                        </button>
                    </ul>
                </div>
            </div>
        </nav>
    );
}