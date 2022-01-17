import { useState } from 'react';
import './App.css';
import AppHeader from './component/AppHeader';
import CardSelection from './component/CardSelection';
import FormSection from './component/FormSection';
import cards from './data/card-img';



function App() {

    /*
    const cardElem = cards.map((card,index)=>{
        console.log(card,index,cards.length);
        return(
            <CardSelection key={index} cardPath={card} cardLength={cards.length} cardIndex={index}  />
        )
    });
    console.log("cardElem: ",cardElem);
    */
    // const [cardId, setCardId] = useState(null);

    // function onCardClick(getCard){
    //     setCardId(getCard);
    //     console.log('add', cardId);
    // }
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchText, setSearchText] = useState('');

    function onCardOpenClick(getCard, elem){
        //console.log('cardClick',getCard, elem);
        setSelectedCard(getCard);
        let imgElemAll = document.querySelectorAll('.card-selected');
        //console.log('imgElemAll', imgElemAll);
        let imgElem = document.getElementById(elem);
        //console.log('imgElem', imgElem, imgElem.className.includes('card-selected'));
        if(imgElem.id===elem && imgElem.className.includes("card-selected")){
            //console.log("equal");
            imgElem.classList.remove('card-selected');
        }else{
            imgElemAll.forEach((img)=>{
                img.classList.remove('card-selected');
            });
            imgElem.classList.add('card-selected');
        }
        

    }

    function onCardCloseClick(){
        setSelectedCard(null);
    }

    const cardElements = cards.filter((card)=>{
        return card.title.includes(searchText);
    }).map((card, index)=>{
        //console.log(card, index);
        return <CardSelection key={index} itemKey={index} card={card} onCardClick={onCardOpenClick} />
    });

    return (
        <div className="App">
            <AppHeader />
            <div className="card-container container-fluid">
                <div className="row card-content">
                    {/* <CardSelection cardPath={cards} /> */}
                    <div className="card-selection-content col-4 col-xs-12 col-sm-12 col-md-4">
                        <div className="card">
                            <div className="card-header">
                                กรุณาเลือกการ์ด
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {cardElements}
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormSection/>
                </div>
            </div>

        </div>
    );
}

export default App;
