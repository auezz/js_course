import './CardPost.css'
function CardPost(props){
    const { card, onBgClick} = props;
    return (
        <div className="card-post">
            <div className="card-post-bg" onClick={onBgClick} />
            <div className="card-post-content">
                <img src={card.thumbnailUrl} alt="" />
                <h4>{card.title}</h4>
            </div>
        </div>

    );
}

export default CardPost;