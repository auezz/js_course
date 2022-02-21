import { useState } from 'react';
import './inputSection.css';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.th';

export default function InputSection({wishList, govList, departmentList, onGovChange, prefixList, govId}) {
    const wishTextRegEx = /&#[0-9]+;/g;
    const wishTextRegEx2 = / &#13;&#10; /g;
    const [wishText, setWishText] = useState('');
    //console.log(govId);

    function onSelectWishTextChange(e){
         if(e.target.value!=0){
            let text = wishList.filter(word => word.id_word==e.target.value);
            let getText = (text[0].word).replace(wishTextRegEx2,'\n');
            onTextareaChange(e,getText);
        }
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
    }

    function onTest(e){
        console.log(e.target.value);
    }


    return (
            <div className='input-section card w-100'>
                <div className="card-header fw-bold text-center">Information</div>
                <div className="card-body p-4">
                    <div className="d-flex gap-3 mb-3">
                        <div className="w-50">
                            <label htmlFor="selectGovList" className="form-label mb-1">ประเภท/สังกัด</label>
                            <select id="selectGovList" className="form-select" onChange={onGovChange}>
                                <option value={0} defaultValue>Choose...</option>
                                {
                                    govList.map((gov, index) => (
                                       <option key={index} value={gov.gov_main_id}>{gov.gov_main}</option>
                                    ))
                                } 
                            </select>
                        </div>
                        <div className={`w-50 ${govId==25?'d-none':'d-block'}`}>
                            <label htmlFor="inputState" className="form-label mb-1">หน่วยงาน</label>
                            <select id="inputState" className={`form-select ${(govId>=23 && govId<=25)?'d-none':'d-block'}`}>
                                <option value={0}>Choose...</option>
                                {
                                    departmentList.map((department, index) => (
                                       <option key={index} value={department.gov_id}>{department.gov_name}</option>
                                    ))
                                } 
                            </select>
                            <input  type="text" 
                                    className={`form-control ${(govId>=23 && govId<=24)?'d-block':'d-none'}`}  
                                    />
                        </div>
                    </div>
                    <div className="d-flex gap-3 user-name-section mb-3">
                        <div className="prefix-name">
                            <label htmlFor="prefixName" className="form-label mb-1">คำนำหน้า</label>
                            <select name="prefixName" id="prefixName" className="form-select">
                                <option value={0}>Choose...</option>
                                {
                                    prefixList.map((prefix, index)=>(
                                        <option key={index} value={prefix.id}>
                                            {prefix.prefix_name_short}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="first-name">
                            <label htmlFor="firstName" className="form-label mb-1">ชื่อ</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="last-name">
                            <label htmlFor="lastName" className="form-label mb-1">นามสกุล</label>
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="w-100 mb-3">
                        <label htmlFor="positionInput" className="form-label mb-1">ตำแหน่ง</label>
                        <input type="text" name="poisition" id="position" className="form-control" />
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
                        <label htmlFor="selectWishText" className="col-sm-2 form-label ">คำอวยพร</label>
                        <div className="col-sm-10">
                            <select id="selectWishText" className="form-select" onChange={onSelectWishTextChange}>
                                <option value={0} defaultValue>Choose...</option>
                                {
                                    wishList.map((wishItem, index) => (
                                       <option key={index} value={wishItem.id_word}>{(wishItem.word).replace(wishTextRegEx,'')}</option>
                                    ))
                                } 
                            </select>
                        </div>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" 
                            value={wishText}
                            onChange={onTextareaChange}
                        >
                            
                        </textarea>
                        <label htmlFor="floatingTextarea">Comments</label>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="btn btn-success">Submit</button>
                    </div>
                    

                </div>

            </div>
  )
}
