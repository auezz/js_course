import React from 'react';
import './GreetingList.css';
const fnc = require('../ClassFunction');

export default function GreetingList(props) {
    const { greetingList, cardList, prefixList, greetingNum, pageSelect,onPageChange } = props;
    console.log('greetingList: ', greetingList);
    console.log('cardList: ', cardList);
    console.log('prefix: ', prefixList);
    
    //const getCard = cardList.find((card)=> card.card_id==="72");
    console.log('dateTh: ', fnc.dateTh(""));
    

    const cardPath = (getCardId=null)=>{
        const setCard = (getCardId===null || getCardId==='')?'69':getCardId;
        const card = cardList.find((item)=>item.card_id===setCard);
        //console.log('card: ', card, '\ngetCardId: ', getCardId, typeof getCardId);
        return card.card_pic;
    }

    const getName = (prefixId, fname, lname)=>{
        const title = prefixList.find((prefix)=>prefix.id===prefixId);
        const name = `${title.prefix_name_short}${fname} ${lname}`;
        return name;
    }

    const Pagination = () => {
        const pageAmount = Math.round(greetingNum / 9);
        console.log('pageAmount: ', pageAmount);
        return (
            <nav aria-label="Page navigation example">
                 <ul className='pagination'>
                    <li className='page-item'>
                        <a className={`page-link pagePrev ${pageSelect > 1 ? "" : "page-disabled"}`}
                            onClick={() => {
                                onPageChange(pageSelect > 1 ? pageSelect - 1 : null);
                            }}
                        >Previous</a>
                    </li>
                    <li className='page-item'><a className='page-link'>{pageSelect}</a></li>
                    <li className='page-item'>
                        <a className={`page-link pageNext ${pageSelect !== pageAmount ? "" : "page-disabled"}`} 
                            onClick={() => {
                                onPageChange(pageSelect !== pageAmount ? pageSelect + 1 : null);
                            }}
                        >Next
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }


    //console.log('getCard: ', cardPath('72'));    

    return (
        <div className='mt-5'>
            <h4 className="text-center fw-bold">รายนามผู้ร่วมอวยพร
                <span className='fw-normal'>&ensp;({fnc.numberWCommas(greetingNum)})</span>
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
                                    <h3 className='anniv-text'>{list.annivText}</h3>      
                                    <p className="greeting-name">
                                        <span className='fw-bold'>โดย&ensp;</span>
                                        <span>{getName(list.prefix, list.firstName, list.lastName)}</span>
                                    </p>
                                    <p className='office-name'></p>
                                    <p className="post-date text-center">{fnc.dateTh(list.createTimestamp)}</p>
                                </div>
                            </div>
                        ))

                        
                    :null
                }
                
                
            </div>
            <div className='text-right'>
                <Pagination/>
            </div>
            
        </div>
    )
}
