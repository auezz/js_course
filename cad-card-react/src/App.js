import logo from './logo.svg';
import './App.css';
import AppHeader from './component/AppHeader';
import CardSelection from './component/CardSelection';
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

    return (
        <div className="App">
            <AppHeader />
            <div className="card-container container-fluid">
                <div className="row card-content">
                    <CardSelection cardPath={cards}  />
                </div>
            </div>

        </div>
    );
}

export default App;
