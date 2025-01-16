const pictures = [
    {
        id: 1,
        image: "/images/carditem.jpg",
        title: "Card title",
        text: "This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
    }
]
export default function MainCard() {
    return (
        <>
            <div className="card text-bg-dark">
                <img src={pictures[0].image} className="card-img d-none d-md-block" alt="..." />
                <div className="card-body d-md-none">
                    <img src={pictures[0].image} className="card-img" alt="..." />
                </div>
                <div className="card-img-overlay d-none d-md-block">
                    <div className="card-body bg-dark">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small>Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <div className="card-body d-md-none">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p className="card-text"><small>Last updated 3 mins ago</small></p>
                </div>
            </div>
        </>
    );
}