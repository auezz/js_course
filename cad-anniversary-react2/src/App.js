import Axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Component/Header';
import CardSection from './Component/CardSection';
import InputSection from './Component/InputSection';
import Modal from 'react-modal';
const fnc = require('./ClassFunction');

function App() {

    const [cardList, setCardList] = useState([]);
    const [cardSelected, setCardSelected] = useState({
        card_id: null,
        card_pic: null
    });
    const [modalIsOpen, setIsOpen] = useState(false);
    const [ministryList, setMinistryList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);
    const [ministryId, setMinistryId] = useState(null);
    const [prefixList, setPrefixList] = useState([]);
    const [annivList, setAnnivList] = useState([]);



    useEffect(()=>{
        const getCardList = async ()=> {
            const cardData = await fetchCardList();    
            //console.log('card: ', cardData);
            let getCardData = [];
            cardData.forEach((element, index) => {
                getCardData[index] = {...element, 'selected': false };
            });
            setCardList(getCardData);       
            console.log(getCardData); 
        }
        const getMinistryList = async ()=>{
            const ministryData = await fetchMinistry();
            setMinistryList(ministryData);
            //console.log('ministryData: ', ministryData);
        }
        const getPrefix = async ()=>{
            const prefix = await fetchPrefix();
            //console.log('prefix: ', prefix);
            setPrefixList(prefix);
        }
        const getAnnivWord = async ()=>{
            const anniv = await fetchAnniv();
            setAnnivList(anniv);

        }
        getCardList();
        getMinistryList();
        getPrefix();
        getAnnivWord();
    },[]);

    useEffect(()=>{
        const getDepartmentList = async ()=>{
            const data = await fetchDepartment();
            setDepartmentList(data);
            console.log('department: ', data);
        }
        getDepartmentList();
    },[ministryId]);


    const fetchCardList = async ()=>{
        const res = await Axios.get("http://localhost:5000/card");
        //Axios.get("http://localhost:5000/wishList");
        const data = await res.data;
        return data;
    }

    const fetchMinistry = async ()=>{
        const res = await Axios.get("http://localhost:5000/ministry");
        const data = await res.data;
        return data;
    }

    const fetchDepartment = async()=>{
        const res = await Axios.get(`http://localhost:5000/department?gov_main_id=${ministryId}`);
        const data = await res.data;
        return data;
    }

    const fetchPrefix = async()=>{
        const res = await Axios.get('http://localhost:5000/prefix_name');
        const data = await res.data;
        return data;
    }

    const fetchAnniv = async()=>{
        const res = await Axios.get('http://localhost:5000/anniversary_word');
        const data = await res.data;
        return data;
    }


    const onCardClick = async(cardId) => {
        //console.log('cardId:', cardId);
        await updateCardList(cardId);
        const cardPath = cardList.find((card) => card.card_id === cardId);
        console.log("cardPath: ",cardPath);
        setCardSelected({
            card_id: cardPath.card_id,
            card_pic: cardPath.card_pic
        });
        console.log('cardSelected: ', cardSelected);
        openModal();
    }

    const updateCardList = async(cardId=null)=>{
        const updateCard = cardList.map(card => {
            if (card.card_id === cardId) {
              return {...card, selected: true};
            }else{
                return {...card, selected: false};
            }
        });
        setCardList(updateCard);
        //return updateCard;

    }

    const onMinistryChange = (e) => {
        const id = e.target.value;
        if(id>0){
            setMinistryId(id);
        }
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#EFD9D1',
          borderRadius: '15px',
        },
    };

    function openModal() {
        setIsOpen(true);
    }
    
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
        console.log('hello after open');
        if(modalIsOpen===true){
            setTimeout(closeModal, 5000);
        }
        



    }
    
    function closeModal() {
        setIsOpen(false);
    }

    const onAddData = async (formData) =>{
        console.log("onAddData1: ",formData);
        await updateCardList();
        formData.createTimestamp = fnc.getTimeStamp();
        formData.card_id = cardSelected.card_id;
        //console.log('onAddData2: ', formData);
        const res = await Axios.post('http://localhost:5000/anniversary_main',formData);
        const data = await res.data;
        console.log('postData: \n', data);
        setCardSelected({
            card_id: null,
            card_pic: null
        });
    }



    return (
        <div className="App">
            <Header/>
            <div className="main-container main-form d-flex gap-5 bd-highlight">
                <CardSection cardList={cardList} onCardClick={onCardClick} />
                <InputSection   ministryList={ministryList} 
                                onMinistryChange={onMinistryChange}
                                departmentList={departmentList}
                                prefixList={prefixList}
                                annivList={annivList}
                                cardSelected={cardSelected}
                                onAddData={onAddData}
                />
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <img className='modal-pic' src={`./images/cad-card-pic/${cardSelected.card_pic}`} alt="" />
            </Modal>
        </div>
    );
}

export default App;
