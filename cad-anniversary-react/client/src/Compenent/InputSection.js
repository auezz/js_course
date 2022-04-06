import { useState } from 'react';
import './inputSection.css';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.th';

export default function InputSection(props) {
    const {wishList, govList, departmentList, onGovChange, prefixList, govId, onAddData, notify} = props;
    const wishTextRegEx = /&#[0-9]+;/g;
    const wishTextRegEx2 = / &#13;&#10; /g;
    const [wishText, setWishText] = useState('');
    const [wishSelect, setWishSelect] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [govItem, setGovItem] = useState(0);
    const [departItem, setDepartItem] = useState(0);
    const [prefix, setPrefix] = useState(0);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    console.log(wishList);

    function onSelectWishTextChange(e){
        let getText = "";
        let selectVal = parseInt(e.target.value);
        if(selectVal!==0 && selectVal!==99){
            let text = wishList.filter(word => word.id_word===selectVal);
            getText = (text[0].word).replace(wishTextRegEx2,'\n');
        }
        onTextareaChange(e,getText);
    }

    function onTextareaChange(e, wishTextValue=null){
        setWishText('');
        //console.log(`wishText: ${wishText}\nwishTextValue: ${wishTextValue}`);
        const targetType = e.target.type;
        if(targetType==="textarea"){
            setWishText(e.target.value);
        }else{
            //console.log(wishText);
            setWishText(wishTextValue);
        }
        console.log(wishTextValue);
        if(wishTextValue!==""){
            const wishTextElem = document.getElementById('wishText');
            const wishSelectElem = document.getElementById('wishSelect');
            wishTextElem.classList.remove('is-invalid');
            wishSelectElem.classList.remove('is-invalid');
        }

    }

    const onSubmit = (e)=>{
        e.preventDefault();
        console.log('onsubmit');
        const inputElems = Array.from(document.querySelectorAll('form.add-form .is-required'));
        console.log(inputElems);
        let countEmpty = 0;
        inputElems.forEach((input)=>{
            //console.log(input.classList);
            let getClass = Array.from(input.classList);
            if(getClass.includes("d-none")===false && input.tagName!=="SELECT" && (input.value==="" || input.value===null)){
                input.classList.add("is-invalid");
                countEmpty++;
            }else if(input.tagName==="SELECT" && parseInt(input.value)===0){
                input.classList.add("is-invalid");
                countEmpty++;
            }
        });
        console.log('countEmpty: ', countEmpty);
        if(countEmpty===0){
            onAddData({ govItem, 
                        departItem, 
                        prefix,
                        firstName,
                        lastName, 
                        position, 
                        phone,
                        email,
                        wishSelect,
                        wishText
                    });
            /*
            setGovItem(0);
            setDepartItem(0);
            setWishSelect(0);
            setPrefix(0);
            setFirstName('');
            setLastName('');
            setPosition('');
            setPhone('');
            setEmail('');
            setWishText(''); 
            */
                   
        }else{
            //notify('กรุณากรอกฟอร์มให้ครบ');
        }
    }

    const onInputChange = (e) => {
        console.log('onInputChange');
        e.target.classList.add('is-invalid');
        if(e.target.value!==""){
            e.target.classList.remove('is-invalid');
        }
        
    }



    return (
            <div className='input-section card w-100'>
                <form className='add-form' onSubmit={onSubmit} action="">
                    <div className="card-header fw-bold text-center">Information</div>
                    <div className="card-body p-4">
                        <div className="d-flex gap-3 mb-3">
                            <div className="w-50">
                                <label htmlFor="selectGovList" className="form-label mb-1">ประเภท/สังกัด</label>
                                <select id="selectGovList" 
                                        className="form-select is-required" 
                                        value={govItem}
                                        onChange={(e)=>{
                                            onGovChange(e);
                                            setGovItem(e.target.value);
                                            onInputChange(e);
                                        }}
                                >
                                    <option value={0} defaultValue>Choose...</option>
                                    {
                                        govList.map((gov, index) => (
                                        <option key={index} value={gov.gov_main_id}>{gov.gov_main}</option>
                                        ))
                                    } 
                                </select>
                                <div className="invalid-feedback">
                                    Please choose a ministry.
                                </div>
                            </div>
                            <div className={`w-50 ${govId===25?'d-none':'d-block'}`}>
                                <label htmlFor="inputState" className="form-label mb-1">หน่วยงาน</label>
                                <select id="inputState" 
                                        className={`form-select is-required ${(govId>=23 && govId<=25)?'d-none':'d-block'}`}
                                        value={departItem}
                                        onChange={(e)=>{
                                            setDepartItem(e.target.value);
                                            onInputChange(e);
                                        }}
                                >
                                    <option value={0} selected={departItem===0?'selected':''}>Choose...</option>
                                    {
                                        departmentList.map((department, index) => (
                                        <option key={index} value={department.gov_id}>{department.gov_name}</option>
                                        ))
                                    } 
                                </select>
                                <input  type="text" 
                                        className={`form-control ${(govId>=23 && govId<=24)?'d-block':'d-none'}`}  
                                        onChange={(e)=>{
                                            setDepartItem(e.target.value);
                                            onInputChange(e);
                                        }}        
                                />
                                <div className="invalid-feedback">
                                    Please choose a department.
                                </div>        
                            </div>
                        </div>
                        <div className="d-flex gap-3 user-name-section mb-3">
                            <div className="prefix-name">
                                <label htmlFor="prefixName" className="form-label mb-1">คำนำหน้า</label>
                                <select name="prefixName" id="prefixName" className="form-select is-required"
                                        onChange={(e)=>{
                                            setPrefix(e.target.value);
                                            onInputChange(e);
                                        }}
                                >
                                    <option value={0}>Choose...</option>
                                    {
                                        prefixList.map((prefix, index)=>(
                                            <option key={index} value={prefix.id}>
                                                {prefix.prefix_name_short}
                                            </option>
                                        ))
                                    }
                                </select>
                                <div className="invalid-feedback">
                                    Please choose prefix name.
                                </div>
                            </div>
                            <div className="first-name">
                                <label htmlFor="firstName" className="form-label mb-1">ชื่อ</label>
                                <input type="text" className="form-control is-required"
                                        value={firstName}
                                        onChange={(e)=> {
                                            setFirstName(e.target.value);
                                            onInputChange(e);
                                        }}           
                                />
                                <div className="invalid-feedback">
                                    Please enter a username.
                                </div>
                            </div>
                            <div className="last-name">
                                <label htmlFor="lastName" className="form-label mb-1">นามสกุล</label>
                                <input  type="text" className="form-control is-required"
                                        onChange={(e)=>{
                                            setLastName(e.target.value);
                                            onInputChange(e);
                                        }}
                                />
                                <div className="invalid-feedback">
                                    Please enter a lastname.
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mb-3">
                            <label htmlFor="positionInput" className="form-label mb-1">ตำแหน่ง</label>
                            <input  type="text" name="poisition" id="position" className="form-control is-required" 
                                    onChange={(e)=>{
                                        setPosition(e.target.value);
                                        onInputChange(e);
                                    }}
                            />
                            <div className="invalid-feedback">
                                Please enter a position.
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div className="w-50">
                                <label htmlFor="mobile" className="form-label mb-1">เบอร์โทรศัพท์</label>
                                {/* <input type="text" className="form-control" /> */}
                                <Cleave className='form-control'
                                        options={{  phone: true,
                                                    phoneRegionCode: 'TH'    
                                                }}                  
                                />
                            </div>
                            <div className="w-50">
                                <label htmlFor="mobile" className="form-label mb-1">อีเมลล์</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="wishSelect" className="col-sm-2 form-label ">คำอวยพร</label>
                            <div className="col-sm-10">
                                <select id="wishSelect" className="form-select is-required" 
                                        onChange={(e)=>{
                                            onSelectWishTextChange(e);
                                            setWishSelect(e.target.value);
                                        }}>
                                    <option value={0} defaultValue>Choose...</option>
                                    {
                                        wishList.map((wishItem, index) => (
                                        <option key={index} value={wishItem.id_word}>{(wishItem.word).replace(wishTextRegEx,'')}</option>
                                        ))
                                    }
                                    <option value={99}>กรอกข้อความด้วยตนเอง</option> 
                                </select>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control wish-text is-required" placeholder="Leave a comment here" id="wishText" 
                                value={wishText}
                                onChange={onTextareaChange}
                            >
                            </textarea>
                            <div className="invalid-feedback">
                                Please enter a wish text
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        

                    </div>
                </form>                
            </div>
  )
}
