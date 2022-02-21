import Axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './Compenent/Header';
import MainForm from './Compenent/MainForm';

function App() {

    const [wishList, setWishList] = useState([]);
    const [govList, setGovList] = useState([]);
    const [department, setDepartment] = useState([]);
    const [govId, setGovId] = useState('');
    const [prefixList, setPrefixList] = useState([]);
    const [cardList, setCardList] = useState([]);
    useEffect(()=>{
        const getWishList = async () => {
            const wishListData = await fetchWishList();
            setWishList(wishListData);
        }  
        getWishList();
    }, []);
    
    const fetchWishList = async()=>{
        const res = await Axios.get("http://localhost:5000/wishList");
        const data = await res.data;
        return data;    
    }
    
    useEffect(()=>{
        const getGovList = async () => {
            const govData = await fetchGovList();
            setGovList(govData);
        }
        getGovList();
    }, []);

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

    useEffect(()=>{
        const getPrefixList = async () => {
            const prefixData = await fetchPrefixList();
            setPrefixList(prefixData);
        }    
        getPrefixList();
    }, []);

    const fetchPrefixList = async () => {
        const res = await Axios.get("http://localhost:5000/prefixName");
        const data = await res.data;
        return data;
    }

    useEffect(()=>{
        const getCardList = async () => {
            const cardListData = await fetchCardList();
            setCardList(cardListData);
        }
        getCardList();
    }, []);

    const fetchCardList = async () => {
        const res = await Axios.get("http://localhost:5000/card-pic");
        const data = await res.data;
        return data;
    }


    // console.log('wishList: ', wishList);
    // console.log('govList: ', govList);
    // console.log('department: ', department);
    // console.log('prefix: ', prefixList);
    console.log('cardList: ', cardList);
    return (
        <div className="App">
            <Header/>
            {
                wishList.length >0 ?<MainForm   wishList={wishList} 
                                                govList={govList}
                                                govId={govId} 
                                                departmentList={department} 
                                                onGovChange={govListChange}
                                                prefixList={prefixList}
                                                cardList={cardList}
                                                />
                                    :""
            }
            
        </div>
    );
}

export default App;
