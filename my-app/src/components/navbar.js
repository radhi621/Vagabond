export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-black navbar-dark border-bottom sticky-top">
            <div className="container-fluid">
                {/* Logo */}
                <a className="navbar-brand" href="/">
                    <img src="/images/logo.png" alt="Logo" height="50" className="ms-3" />
                </a>
                {/* Toggler for Mobile View */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navbar Content */}
                <div className="collapse navbar-collapse text-center " id="navbarNav">
                    {/* Centered Links */}
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/Games">GAMES</a>
                        </li>

                        {/* Dropdown for News */}
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mx-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            NEWS
                        </a>
                        <ul className="dropdown-menu bg-black">
                            <li><a className="dropdown-item text-white bg-transparent" href="/news">Our News</a></li>
                            <li><a className="dropdown-item text-white bg-transparent" href="/gamingnews">Gaming News</a></li>
                        </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/merch">MERCH</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/Hiring">WE'RE HIRING</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link mx-3" href="/Contact">CONTACT</a>
                        </li>
                    </ul>
                    {/* Join Discord Button */}
                    <div className="text-center">
                        <button className="btn bg-danger text-white px-4 py-2 d-inline-flex align-items-center border-0">
                            <i className="fa-brands fa-discord me-2"></i> JOIN OUR DISCORD
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
