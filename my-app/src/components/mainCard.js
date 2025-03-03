export default function MainCard() {
    return (
        <>
            <div className="card text-bg-dark border-0 rounded-0">
                <img src="../images/Carouselitem.jpg" className="card-img  d-md-block" alt="Soldier at window" style={{objectFit: "cover",width: "100%",height: "70vh"}} />   
                <div className="card-img-overlay d-none d-md-block">
                    <div className="container h-100">
                        <div className="row h-100 justify-content-end">
                            <div className="col-md-5 d-flex align-items-end">
                                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} className="p-4">
                                    <h2 className="text-white mb-3">OUR FUNDAMENTAL VISION</h2>
                                    <p className="text-white-50">Bellum is created by first responder special operations units to create realistic and authentic military experiences from years of service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body d-md-none bg-black">
                    <h2 className="text-white mb-3">OUR FUNDAMENTAL VISION</h2>
                    <p className="text-white-50">Bellum is created by first responder special operations units to create realistic and authentic military experiences from years of service.</p>
                </div>
            </div>

            <div className="card text-bg-dark border-0 rounded-0">
                <img src="../images/Carouselitem.jpg" className="card-img  d-md-block" alt="Soldiers at sunset" style={{objectFit: "cover",width: "100%",height: "70vh"}} />
                <div className="card-img-overlay d-none d-md-block">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-md-5 d-flex align-items-end">
                                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} className="p-4">
                                    <h2 className="text-white mb-3">TRUE TEAM TACTICS</h2>
                                    <p className="text-white-50">Experience team collaboration and coordination like never before as you engage in tactical team-based gameplay.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body d-md-none bg-black">
                    <h2 className="text-white mb-3">TRUE TEAM TACTICS</h2>
                    <p className="text-white-50">Experience team collaboration and coordination like never before as you engage in tactical team-based gameplay.</p>
                </div>
            </div>

            <div className="card text-bg-dark border-0 rounded-0">
                <img src="../images/Carouselitem.jpg" className="card-img d-md-block" alt="Soldier at window" style={{objectFit: "cover",width: "100%",height: "70vh"}} />
                <div className="card-img-overlay d-none d-md-block">
                    <div className="container h-100">
                        <div className="row h-100 justify-content-end">
                            <div className="col-md-5 d-flex align-items-end">
                                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} className="p-4">
                                    <h2 className="text-white mb-3">OUR FUNDAMENTAL VISION</h2>
                                    <p className="text-white-50">Bellum is created by first responder special operations units to create realistic and authentic military experiences from years of service.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body d-md-none bg-black">
                    <h2 className="text-white mb-3">OUR FUNDAMENTAL VISION</h2>
                    <p className="text-white-50">Bellum is created by first responder special operations units to create realistic and authentic military experiences from years of service.</p>
                </div>
            </div>

            <div className="card text-bg-dark border-0 rounded-0">
                <img src="../images/Carouselitem.jpg" className="card-img d-md-block" alt="Soldiers at sunset" style={{objectFit: "cover",width: "100%",height: "70vh"}} />
                <div className="card-img-overlay d-none d-md-block">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-md-5 d-flex align-items-end">
                                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} className="p-4">
                                    <h2 className="text-white mb-3">TRUE TEAM TACTICS</h2>
                                    <p className="text-white-50">Experience team collaboration and coordination like never before as you engage in tactical team-based gameplay.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body d-md-none bg-black">
                    <h2 className="text-white mb-3">TRUE TEAM TACTICS</h2>
                    <p className="text-white-50">Experience team collaboration and coordination like never before as you engage in tactical team-based gameplay.</p>
                </div>
            </div>

            <div className="card text-bg-dark border-0 rounded-0">
                <img src="../images/Carouselitem.jpg" className="card-img d-md-block" alt="Soldier at window" style={{objectFit: "cover",width: "100%",height: "70vh"}} />
                <div className="card-img-overlay d-none d-md-block">
                    <div className="container h-100">
                        <div className="row h-100 justify-content-center">
                            <div className="col-md-5 d-flex align-items-center">
                                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }} className="p-4 d-flex flex-column align-items-center">
                                    <h2 className="text-white mb-3">JOIN OUR COMMUNITY TODAY</h2>
                                    <p className="text-white-50">Bellum is created by first responder special operations units to create realistic and authentic military experiences from years of service.</p>
                                    <div className="d-flex justify-content-center">
                                        <button className="nav-item bg-danger text-white border border-0 p-2">
                                            <a className="nav-link" href="/"><i className="fa-brands fa-discord"></i> JOIN OUR DISCORD</a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body d-md-none bg-black d-flex flex-column align-items-center">
                    <h2 className="text-white mb-3">OUR FUNDAMENTAL VISION</h2>
                    <p className="text-white-50">Bellum is created by first responder special operations units to create realistic and authentic military experiences from years of service.</p>
                    <div className="d-flex justify-content-center">
                        <button className="nav-item bg-danger text-white border border-0 p-2">
                            <a className="nav-link" href="/"><i className="fa-brands fa-discord"></i> JOIN OUR DISCORD</a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}