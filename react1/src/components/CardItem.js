import './CardItem.css';
function CardItem(props){
    const { card, onCardClick } = props;
    //console.log("cardItem", props);
    return (
        <div className='card-item'>
            <img className='img-card' src={card.thumbnailUrl} onClick={()=>{onCardClick(card)}} alt="" />
            <h4 className='card-title'>{card.title}</h4>
        </div>
    );
}

export default CardItem;