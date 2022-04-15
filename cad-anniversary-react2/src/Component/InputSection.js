import React from 'react'
import { useEffect, useState } from 'react';
import './InputSection.css';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.th';
import styled from 'styled-components';
import { MdSave } from 'react-icons/md';

export default function InputSection(props) {
    const {ministryList, onMinistryChange, departmentList, prefixList, annivList, cardSelected, onAddData} = props;
    const wishTextRegEx = /&#[0-9]+;/g;
    const wishTextRegEx2 = / &#13;&#10; /g;
    const emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const initialVal = {
        ministry: 0,
        department: 0,
        prefix: 0,
        firstName: '',
        lastName: '',
        position: '',
        phone: '',
        email: '',
        annivId: 0,
        annivText: ''
    };
    const [formData, setFormData] = useState(initialVal);
    const elemList = Array.from(document.querySelectorAll('.add-form input, .add-form select, .add-form textarea'));
    const SaveIcon = styled(MdSave)`
        width: 20px;
        height: 20px;
        vertical-align: text-top;
    `;
    // console.log('A elemList: ', elemList);
    // console.log('annivList: ', annivList);
    // console.log('cardSelected: ', cardSelected.card_id, typeof cardSelected.card_id, cardSelected);


    const onSelectchange = (e)=>{
        //console.log('onSelectChange: ', e);
        if(e.target.id==="ministry"){
            const departmentElem = document.getElementById('department');
            departmentElem.value = 0;
        }
    }

    const onSubmitForm = (e)=>{
        e.preventDefault();
        //console.log('submit');
        //console.log('formData: ', formData);
        let check = true;
        elemList.forEach((elem)=>{
            let elemClassList = Array.from(elem.classList);
            //console.log(elemClassList);
            if(elemClassList.includes('is-required')===true){
                if(elem.type==="select-one" && elem.value==="0"){
                    elem.classList.add('is-invalid');
                    check = false;
                    if(elem.id==="annivId"){
                        const annivTextElem = document.getElementById('annivText');
                        annivTextElem.classList.add('is-invalid');
                    }
                }else if((elem.type==="text" || elem.type==="textarea") && elem.value===""){
                    elem.classList.add('is-invalid');
                    check = false;
                }
            }else{
                if(elem.id==="phone" && elem.value!==""){
                    let getVal = elem.value.split(" ").join('');
                    //console.log('getValPhone: ', getVal, getVal.length);
                    if(getVal.length!==10){
                        elem.classList.add('is-invalid');
                        check = false;
                    }else{
                        setFormData((prevFromData)=>{
                            return {
                                ...prevFromData,
                                phone: getVal
                            }
                        });
                    }
                }else if(elem.id==="email" && elem.value!==""){
                    if(elem.value.match(emailValidRegex)){
                        //console.log('email: ',true);
                    }else{
                        elem.classList.add('is-invalid');
                        check = false;
                    }
                }
            }
        });
        
        //console.log('checkState: ', check);
        if(check===true){
            onAddData(formData);
            //console.log('initailVal: ', initialVal);
            //console.log('formData: ', formData);
            setFormData(initialVal);
            
        }
    }

    const onInputChange = (e)=>{
        //console.log('onInputChangeL ', e.target.id, e.target.value);
        const { name, value } = e.target;
        const annivTextElem = document.getElementById('annivText');
        
        if(e.target.id==="ministry"){
            const departmentElem = document.getElementById('department');
            departmentElem.value = 0;
        }

        if(e.target.value!=="" || e.target.value!=="0"){
            e.target.classList.remove('is-invalid');
            if(e.target.id==="annivId"){
                let textAnniv = "";
                annivTextElem.disabled = false;
                annivTextElem.classList.remove('is-invalid');
                if(e.target.value!=="99" && e.target.value!=="0"){
                    let textAnnivObj = annivList.find(item=> item.id_word === e.target.value);
                    console.log('textAnniv: ', textAnnivObj.word);
                    textAnniv = textAnnivObj.word.replace(wishTextRegEx2,'\n');
                }else{
                    annivTextElem.disabled = true;
                }
                setFormData((prevFromData)=>{
                    return {
                        ...prevFromData,
                        annivText: textAnniv
                    }
                });
            }
        }
        setFormData((prevFromData)=>{
            return {
                ...prevFromData,
                [name]: value
            }
        });
        //console.log(e.target.value);
        
    }

    
    const setOnChange = ()=>{
        elemList.forEach((elem)=>{
            elem.addEventListener('change', onInputChange);
        });
    }
    //setOnChange();



    return (
        <div className='input-section card w-100 mb-3'>
            <div className="card-header">
                Input Section
            </div>
            <div className="card-body">
                <form className='add-form' onSubmit={onSubmitForm} action="">
                    <div className="d-flex gap-3 mb-3">
                        <div className="w-50">
                            <label htmlFor="ministry" className="form-label mb-1">ประเภท/สังกัด</label>
                            <select name="ministry" 
                                    id="ministry"
                                    className='form-select is-required'
                                    value={formData.ministry}
                                    onChange={(e)=>{
                                        onMinistryChange(e);
                                        onInputChange(e);

                                    }}
                                    
                            >
                                <option value={0} defaultValue>-- กรุณาเลือก --</option>
                                {
                                    ministryList.map((data, index)=>(
                                        <option key={index} value={data.gov_main_id}>{data.gov_main}</option>            

                                    ))
                                }            
                            </select>
                            <div className="invalid-feedback">
                                กรุณาเลือกประเภท/สังกัด
                            </div>
                        </div>
                        <div className="w-50">
                            <label htmlFor="department" className='form-label mb-1'>ชื่อหน่วยงาน</label>        
                            <select name="department" 
                                    id="department"
                                    className='form-select is-required'
                                    onChange={(e)=>{
                                        onInputChange(e);    
                                    }}
                                    value={formData.department} >
                                <option value={0} defaultValue>-- กรุณาเลือก --</option>
                                {
                                    departmentList.map((data, index)=>(
                                        <option key={index} value={data.gov_id}>{data.gov_name}</option>

                                    ))        

                                }        
                            </select>
                            <div className="invalid-feedback">
                                กรุณาเลือกหน่วยงาน
                            </div>    
                        </div>
                    </div>
                    <div className="d-flex gap-3 mb-3 user-info-input">
                        <div className="prefix">
                            <label htmlFor="prefix" className='form-label text-nowrap mb-1'>คำนำหน้า</label>
                            <select name="prefix" 
                                    id="prefix"
                                    className='form-select is-required'
                                    value={formData.prefix}
                                    onChange={onInputChange}>
                                <option value={0} defaultValue>-- กรุณาเลือก --</option>
                                {
                                    prefixList.map((data, index)=>(
                                        <option key={index} value={data.id}>{data.prefix_name_short}</option>
                                    ))
                                }            
                            </select>        
                            <div className="invalid-feedback">
                                กรุณาเลือกคำนำหน้า
                            </div>        
                        </div>
                        <div className="fname">
                            <label htmlFor="firstName" className='form-label mb-1'>ชื่อ</label>
                            <input type="text" className='form-control is-required' 
                                id="firstName" name='firstName'
                                value={formData.firstName}
                                onChange={onInputChange}
                            />
                            <div className="invalid-feedback">
                                กรุณากรอกชื่อ
                            </div>            
                        </div>            
                        <div className="lname">
                            <label htmlFor="lastName" className='form-label mb-1'>นามสกุล</label>
                            <input type="text" className='form-control is-required' 
                                id="lastName" name='lastName'
                                value={formData.lastName}
                                onChange={onInputChange}
                            />
                            <div className="invalid-feedback">
                                กรุณากรอกนามสกุล
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="position" className='form-label mb-1'>ตำแหน่ง</label>
                        <input type="text" className='form-control is-required'
                            id="position" name='position' 
                            value={formData.position}
                            onChange={onInputChange}
                        />
                        <div className="invalid-feedback">
                            กรุณาระบุตำแหน่ง
                        </div>
                    </div>
                    <div className="d-flex gap-3 mb-3">
                        <div className="phone w-50">
                            <label htmlFor="phone" className='form-label mb-1'>เบอร์โทรศัพท์</label>
                            <Cleave className='form-control'
                                id='phone'
                                name='phone'
                                value={formData.phone}
                                options={{  phone: true,
                                            phoneRegionCode: 'TH'    
                                        }} 
                                onChange={onInputChange}                         
                            />
                            <div className="invalid-feedback">
                                กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง
                            </div>
                        </div>
                        <div className="email w-50">
                            <label htmlFor="email" className='form-label mb-1'>อีเมล</label>
                            <input type="text" className='form-control'
                                    id="email" name='email'
                                    value={formData.email}
                                    onChange={onInputChange}
                            />
                            <div className="invalid-feedback">
                                รูปแบบอีเมลไม่ถูกต้อง
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3 mb-3">
                        <div className="select-anniv-title">คำอวยพร</div>
                        <div className='select-anniv'>
                            <select name="annivId" 
                                    id="annivId" 
                                    className='form-select is-required'
                                    onChange={onInputChange}
                                    value={formData.annivId}
                            >
                                <option value={0} defaultValue>-- เลือกคำอวยพร --</option>
                                {
                                    annivList.map((data, index)=>(
                                        <option key={index} value={data.id_word}>{(data.word).replace(wishTextRegEx,'')}</option>
                                    ))
                                }
                                <option value={99}>กรอกข้อความด้วยตนเอง</option>        
                            </select>
                        </div>
                    </div>
                    <div className="anniv-text mb-3">
                        <textarea   className="form-control is-required" 
                                    placeholder="กรอกข้อความอวยพร" 
                                    id="annivText"
                                    name='annivText'
                                    value={formData.annivText}
                                    onChange={onInputChange}
                                    disabled>
                        </textarea>
                        <div className="invalid-feedback">
                            กรุณากรอกคำอวยพร
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" data-micromodal-trigger="modal-1"/>
                        <label className="form-check-label" htmlFor='flexCheckChecked'>
                            Checked checkbox
                        </label>
                    </div>
                    <div className='btn-container text-center mt-4'>
                        <button className='btn btn-success px-4'
                                type='submit'    
                        > 
                            <SaveIcon />&ensp;บันทึก
                        </button>            
                    </div>
                </form>    
            </div>
        </div>
    )
}
