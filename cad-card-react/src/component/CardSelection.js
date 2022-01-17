import { useState } from 'react';
import './CardSelection.css';

function CardSelection(props){
    const { card, itemKey, onCardClick } = props;
    let imgId = `img-${itemKey}`;
    return(
        <div className="col-sm-4 mb-3" >
            <img    src={card.thumbnailUrl} alt="" className='img-card' id={imgId} 
                    onClick={()=>{onCardClick(itemKey, imgId)}}
            />
        </div>

    );
}


export default CardSelection;