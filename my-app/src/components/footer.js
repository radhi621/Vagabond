export default function Footer() {
    return (
        <>
            <footer className="bg-black  text-light py-4">
                <div className="container">
                    <div className="row text-center text-md-start">
                        <div className="col-12 col-md-3 mb-3 mb-md-0 text-center">
                            <img src="/images/logo.png" alt="Logo" height="70" />
                        </div>
                        <div className="col-12 col-md-3 mb-3 mb-md-0">
                            <h6 className="text-uppercase fw-bold">Community</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-light text-decoration-none">Discord</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Reddit</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-3 mb-3 mb-md-0">
                            <h6 className="text-uppercase fw-bold">Content</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-light text-decoration-none">YouTube</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Twitch</a></li>
                                <li><a href="#" className="text-light text-decoration-none">TikTok</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-3">
                            <h6 className="text-uppercase fw-bold">Social</h6>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-light text-decoration-none">Instagram</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Facebook</a></li>
                                <li><a href="#" className="text-light text-decoration-none">X / Twitter</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <small>&copy; 2025 Vagabond Studio. All Rights Reserved.</small>
                    </div>
                </div>
            </footer>
        </>
    );
}