import './SelectCardSection.css';

export default function SelectCardSection({ cardList }) {
    console.log(cardList);
    return (
        <div className='w-75 card-select-section card'>
            <div className="card-header text-center fw-bold">Select Card</div>
            <div className="card-body">
                {
                    cardList.map((card, index)=>(
                        <div className="card-container">
                            <img    index={index} id={card.card_id}
                                src={`/images/cad-card-pic/${card.card_pic}`} alt="" />
                        </div>
                    ))

                }
            </div>
        </div>
    )
}
