import Axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './Compenent/Header';
import MainForm from './Compenent/MainForm';
import VisitorList  from './Compenent/VisitorList';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    const [wishList, setWishList] = useState([]);
    const [govList, setGovList] = useState([]);
    const [department, setDepartment] = useState([]);
    const [govId, setGovId] = useState('');
    const [prefixList, setPrefixList] = useState([]);
    const [cardList, setCardList] = useState([]);
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalPic, setModalPic] = useState(null);
    const [visitList, setVisitList] = useState([]);
    const [loadStatus, setLoadStatus] = useState(false);

    const notify = (text) => toast.error(`${text}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    useEffect(()=>{
        const getWishList = async () => {
            const wishListData = await fetchWishList();
            setWishList(wishListData);
        }
        const getGovList = async () => {
            const govData = await fetchGovList();
            setGovList(govData);
        }
        const getPrefixList = async () => {
            const prefixData = await fetchPrefixList();
            setPrefixList(prefixData);
        }
        const getCardList = async () => {
            const cardListData = await fetchCardList();
            let getCard = [];
            cardListData.forEach((element, index) => {
                getCard[index] = {'card_id': element.card_id,
                            'card_pic': element.card_pic,
                            'selected': false};
            });
            setCardList(getCard);
        }
        getWishList();
        getGovList();  
        getPrefixList();
        getCardList();   
    }, []);
    
    const fetchWishList = async()=>{
        const res = await Axios.get("http://localhost:5000/wishList");
        const data = await res.data;
        return data;    
    }
    const fetchGovList = async ()=>{
        const res = await Axios.get("http://localhost:5000/govList");
        const data = await res.data;
        return data;
    }
   
    
    useEffect(()=>{
        const getDepartmentList = async () => {
            const departmentData = await fetchDepartmentList();
            setDepartment(departmentData);
            //console.log('departmentData: ', departmentData);
        }
        getDepartmentList();
    }, [govId]);

    useEffect(()=>{
        const getVisitList = async () => {
            const visitListData = await fetchVisitList();
            //setWishList(wishListData);
            console.log('visitList: ',visitListData);
            setVisitList(visitListData);
            setLoadStatus(false);
        }
        getVisitList();    
    }, [loadStatus]);
    
    

    const fetchDepartmentList = async () =>{
        const res = await Axios.post("http://localhost:5000/department", {govId: govId});
        const data = await res.data;
        return data;
    }

    const govListChange = async (e) => {
        const govId = e.target.value;
        if(govId>0){
            setGovId(govId);
        } 
    }
    const fetchPrefixList = async () => {
        const res = await Axios.get("http://localhost:5000/prefixName");
        const data = await res.data;
        return data;
    }
    const fetchCardList = async () => {
        const res = await Axios.get("http://localhost:5000/card-pic");
        const data = await res.data;
        return data;
    }

    const fetchVisitList = async() => {
        const res = await Axios.get("http://localhost:5000/visit-list");
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
        //console.log('update-card: ', updateCard);  
        setCardList(updateCard);
        const cardPath = cardList.find((card) => card.card_id === cardId);
        console.log("cardPath: ",cardPath);
        setModalPic(cardPath.card_pic);
        openModal();
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
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    const onAddData = async (formData) =>{
        console.log('onAddData\nformData: ', formData);
        if(modalPic===null){
            //notify('กรุณาเลือกการ์ดอวยพร');
        }else{
            const cardData = cardList.find((card) => {
                if(card.selected===true){
                    return card.card_id;
                }
            });
            formData.cardData = cardData;
            console.log('onAddData\nformData: ', formData);
            const res = await Axios.post('http://localhost:5000/submit-data',formData);
            const data = await res.data;
            console.log('responseData: ', data);
            setLoadStatus(true);
        }
    };



    // console.log('wishList: ', wishList);
    // console.log('govList: ', govList);
    // console.log('department: ', department);
    // console.log('prefix: ', prefixList);
    console.log('cardList: ', cardList);
    return (
        <div className="App">
            <Header/>
            <div className="main-container">
            {
                wishList.length >0 ?<MainForm   wishList={wishList} 
                                                govList={govList}
                                                govId={govId} 
                                                departmentList={department} 
                                                onGovChange={govListChange}
                                                prefixList={prefixList}
                                                cardList={cardList}
                                                onCardClick={onCardClick}
                                                onAddData={onAddData}
                                                notify={notify}
                                                />
                                    :""
            }
            <VisitorList visitList={visitList}/>

            </div>
            
            <ToastContainer />
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
