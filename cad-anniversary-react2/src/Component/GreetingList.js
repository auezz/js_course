import React from 'react';
import './GreetingList.css';
const fnc = require('../ClassFunction');

export default function GreetingList(props) {
    const { greetingList, cardList } = props;
    console.log('greetingList: ', greetingList);
    console.log('cardList: ', cardList);
    //const getCard = cardList.find((card)=> card.card_id==="72");
    

    const cardPath = (getCardId=null)=>{
        // const card = (cardId===null || cardId==='')?69:cardId;
        // const getCard = cardList.find((card)=>card.card_id===card);
        // console.log(getCard, cardId);
        // return getCard.card_pic;
        const setCard = (getCardId===null || getCardId==='')?'69':getCardId;
        const card = cardList.find((item)=>item.card_id===setCard);
        console.log('card: ', card, '\ngetCardId: ', getCardId, typeof getCardId);
        return card.card_pic;

    }

    //console.log('getCard: ', cardPath('72'));    

    return (
        <div className='mt-5'>
            <h4 className="text-center fw-bold">รายนามผู้ร่วมอวยพร
                <span className='fw-normal'>&ensp;({fnc.numberWCommas(greetingList.length)})</span>
            </h4>
            <div className="card-list-container">
                {
                    greetingList.length>0?
                        greetingList.map((list,index)=>(
                            <div className="card-box" key={index}>
                                <div className="card-thumbnail">
                                    <img src={`/images/cad-card-pic/${cardPath(list.card_id)}`} alt="" />
                                </div>
                                <div className="card-content">
                                    
                                </div>
                            </div>
                        ))

                        
                    :null
                }
                
            </div>
        </div>
    )
}
