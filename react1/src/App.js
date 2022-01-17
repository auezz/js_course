import { useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import AppSearch from './components/AppSearch';
import CardItem from './components/CardItem';
import CardPost from './components/CardPost';
import cards from './data/cards';


function App() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchText, setSearchText] = useState('');

    function onCardOpenClick(getCard){
        console.log('cardClick',getCard);
        setSelectedCard(getCard);
    }

    function onCardCloseClick(){
        setSelectedCard(null);
    }

    // const filteredCards = cards.filter((card)=>{
    //     return card.title.includes(searchText);
    // });
    // console.log('filter', filteredCards);
    const cardElements = cards.filter((card)=>{
        return card.title.includes(searchText);
    }).map((card, index)=>{
        //console.log(card, index);
        return <CardItem key={index} itemKey={index} card={card} onCardClick={onCardOpenClick} />
    });
    let cardPost = null;
    if(!!selectedCard){
        cardPost = <CardPost card={selectedCard}  onBgClick={onCardCloseClick}/>
    }

    return (
        <div className="app">
            <AppHeader />
            <section className='app-section'>
                <div className="app-container">
                    <AppSearch value={searchText} onValueChange={setSearchText} />
                    <div className='app-grid'>
                        {cardElements}
                    </div>        
                </div>
            </section>
            {cardPost}
        </div>
    );
}

export default App;
