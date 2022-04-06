import Axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Component/Header';
import CardSection from './Component/CardSection';
import InputSection from './Component/InputSection';
import Modal from 'react-modal';


function App() {

    const [cardList, setCardList] = useState([]);
    const [cardSelected, setCardSelected] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalPic, setModalPic] = useState(null);
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


    const onCardClick = (cardId) => {
        //console.log('cardId:', cardId);
        const updateCard = cardList.map(card => {
            if (card.card_id === cardId) {
              return {...card, selected: true};
            }else{
                return {...card, selected: false};
            }
        });
        console.log('update-card: ', updateCard);  
        
        setCardList(updateCard);
        const cardPath = cardList.find((card) => card.card_id === cardId);
        console.log("cardPath: ",cardPath);
        setModalPic(cardPath.card_pic);
        openModal();
        
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
        setTimeout(closeModal, 5000);



    }
    
    function closeModal() {
        setIsOpen(false);
    }



    return (
        <div className="App">
            <Header/>
            <div className="main-container main-form d-flex gap-5 bd-highlight">
                <CardSection cardList={cardList} onCardClick={onCardClick} />
                <InputSection   ministryList={ministryList} 
                                onMinistryChange={onMinistryChange}
                                ministryId={ministryId}
                                departmentList={departmentList}
                                prefixList={prefixList}
                                annivList={annivList}
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
                <img className='modal-pic' src={`./images/cad-card-pic/${modalPic}`} alt="" />
            </Modal>
        </div>
    );
}

export default App;
