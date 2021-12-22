import './CardSelection.css';

function CardSelection(props){
    
    const { cardPath } = props;
    const imgCollects = cardPath.map((card, index)=>{
        //console.log("card: ",card);
        let cardId = `card_${index}`;
        return (    <div className="col-sm-4 mb-3" key={index} >
                        <img src={card.thumbnailUrl} 
                            alt="" className='img-card' id={cardId} 
                            onClick={getId}
                        />
                    </div>
        );
    });
    return(
        <div className="card-selection-content col-6">
            <div className="card">
                <div className="card-header">
                    กรุณาเลือกการ์ด
                </div>
                <div className="card-body">
                    <div className="row">
                        {imgCollects}
                    </div>
                </div>
            </div>
        </div>
    );
}

function getId(){
    console.log("hello", this);
}

export default CardSelection;