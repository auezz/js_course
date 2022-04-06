import { useState } from 'react';
import './SelectCardSection.css';

export default function SelectCardSection(props) {
    const { cardList, onCardClick } = props;
    console.log(cardList);
    const [cardSelect, setCardSelect] = useState(null);
    


    return (
        <div className='w-75 card-select-section card'>
            <div className="card-header text-center fw-bold">Select Card</div>
            <div className="card-body">
                {
                    cardList.map((card, index)=>(
                        <div className={`card-container ${card.selected===true?'selected':''}`} key={index}>
                            <img key={index} id={card.card_id}
                                src={`/images/cad-card-pic/${card.card_pic}`} alt="" 
                                onClick={(e)=>{
                                    onCardClick(card.card_id);
                                    setCardSelect(card.card_id);
                                }}
                                />
                        </div>
                    ))

                }
            </div>
        </div>
    )
}
