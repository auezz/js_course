import React from 'react'
import './CardSection.css';

export default function CardSection(props) {
    const { cardList, onCardClick } = props;
    //console.log('cardList: ', cardList);

    function setSelectedClass(card_id){
        const cardContainerList = Array.from(document.querySelectorAll('.card-container'));
        //console.log('card_id: ', card_id,'\ncardContainerList:' ,cardContainerList);
        const selectedId = `card-container-${card_id}`;
        cardContainerList.forEach((item)=>{
            if(item.id===selectedId){
                item.classList.add("selected");
            }else{
                item.classList.remove("selected");
            }

        });


    }

    
    return (
        <div className='w-75 card-select-section card'>
            <div className="card-header">
                card selection
            </div>
            <div className="card-body">
                {
                    //console.log('cardLIst: ', cardList)
                    cardList.map((card, index)=>(
                        <div    className={`card-container ${card.selected===true?'selected':''}`} 
                                key={index}
                                id={`card-container-${card.card_id}`}
                                onClick={(e)=>{
                                    onCardClick(card.card_id);
                                    setSelectedClass(card.card_id)
                                }}
                        >
                            <img key={index} id={card.card_id} src={`/images/cad-card-pic/${card.card_pic}`} alt="" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
