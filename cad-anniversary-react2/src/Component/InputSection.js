import React from 'react'
import './InputSection.css';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.th';

export default function InputSection(props) {
    const {ministryList, onMinistryChange, ministryId, departmentList, prefixList, annivList} = props;
    const wishTextRegEx = /&#[0-9]+;/g;
    const elemList = Array.from(document.querySelectorAll('.add-form input, .add-form select, .add-form textarea'));
    console.log('A elemList: ', elemList);
    console.log('annivList: ', annivList);


    const onSelectchange = (e)=>{
        console.log('onSelectChange: ', e);
        if(e.target.id==="selectMinistryList"){
            const departmentElem = document.getElementById('selectDepartmentList');
            departmentElem.value = 0;
        }
    }

    const onSubmitForm = (e)=>{
        e.preventDefault();
        console.log('submit');
        elemList.forEach((elem)=>{
            let elemClassList = Array.from(elem.classList);
            console.log(elemClassList);
            if(elemClassList.includes('is-required')===true){
                if(elem.type==="select-one" && elem.value==="0"){
                    elem.classList.add('is-invalid');
                    if(elem.id==="selectAnniv"){
                        const textareaAnnivElem = document.getElementById('textareaAnniv');
                        textareaAnnivElem.classList.add('is-invalid');
                    }
                }else if((elem.type==="text" || elem.type==="textarea") && elem.value===""){
                    elem.classList.add('is-invalid');
                }
            }


        });
    }

    const onInputChange = (e)=>{
        console.log('onInputChangeL ', e);
        if(e.target.type==="select-one" && e.target.value!=="0"){
            e.target.classList.remove('is-invalid');
            if(e.target.id==="selectAnniv"){
                const textareaAnnivElem = document.getElementById('textareaAnniv');
                textareaAnnivElem.disabled = false;
            }
        }else if((e.target.type==="text" || e.target.type==="textarea") && e.target.value!==""){
            e.target.classList.remove('is-invalid');
        }
    }

    const setOnChange = ()=>{
        elemList.forEach((elem)=>{
            elem.addEventListener('change', onInputChange);
        });
    }
    setOnChange();



    return (
        <div className='input-section card w-100 mb-3'>
            <div className="card-header">
                Input Section
            </div>
            <div className="card-body">
                <form className='add-form' onSubmit={onSubmitForm} action="">
                    <div className="d-flex gap-3 mb-3">
                        <div className="w-50">
                            <label htmlFor="selectMinistryList" className="form-label mb-1">ประเภท/สังกัด</label>
                            <select name="selectMinistryList" 
                                    id="selectMinistryList"
                                    className='form-select is-required'
                                    onChange={(e)=>{
                                        onMinistryChange(e);
                                        onSelectchange(e);

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
                            <label htmlFor="selectDepartmentList" className='form-label mb-1'>ชื่อหน่วยงาน</label>        
                            <select name="selectDepartmentList" 
                                    id="selectDepartmentList"
                                    className='form-select is-required'>
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
                            <label htmlFor="selectPrefixName" className='form-label text-nowrap mb-1'>คำนำหน้า</label>
                            <select name="selectPrefixName" 
                                    id="selectPrefixName"
                                    className='form-select is-required'>
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
                            <label htmlFor="inputFirstName" className='form-label mb-1'>ชื่อ</label>
                            <input type="text" className='form-control is-required' 
                                id="inputFirstName" name='inputFirstName'
                            />
                            <div className="invalid-feedback">
                                กรุณากรอกชื่อ
                            </div>            
                        </div>            
                        <div className="lname">
                            <label htmlFor="inputLastName" className='form-label mb-1'>นามสกุล</label>
                            <input type="text" className='form-control is-required' 
                                id="inputLastName" name='inputLastName'
                            />
                            <div className="invalid-feedback">
                                กรุณากรอกนามสกุล
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPosition" className='form-label mb-1'>ตำแหน่ง</label>
                        <input type="text" className='form-control is-required'
                            id="inputPosition" name='inputPosition' 
                        />
                        <div className="invalid-feedback">
                            กรุณาระบุตำแหน่ง
                        </div>
                    </div>
                    <div className="d-flex gap-3 mb-3">
                        <div className="phone w-50">
                            <label htmlFor="inputPhone" className='form-label mb-1'>เบอร์โทรศัพท์</label>
                            <Cleave className='form-control'
                                id='inputPhone'
                                name='inputPhone'
                                options={{  phone: true,
                                            phoneRegionCode: 'TH'    
                                        }}                  
                            />
                            <div className="invalid-feedback">
                                กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง
                            </div>
                        </div>
                        <div className="email w-50">
                            <label htmlFor="inputEmail" className='form-label mb-1'>อีเมล</label>
                            <input type="text" className='form-control'
                                    id="inputEmail" name='inputEmail'
                            />
                            <div className="invalid-feedback">
                                รูปแบบอีเมลไม่ถูกต้อง
                            </div>
                        </div>
                    </div>
                    <div className="d-flex gap-3 mb-3">
                        <div className="select-anniv-title">คำอวยพร</div>
                        <div className='select-anniv'>
                            <select name="selectAnniv" id="selectAnniv" className='form-select is-required'>
                                <option value={0} defaultValue>-- เลือกคำอวยพร --</option>
                                {
                                    annivList.map((data, index)=>(
                                        <option key={index} value={data.id_word}>{(data.word).replace(wishTextRegEx,'')}</option>
                                    ))
                                }        
                            </select>
                        </div>
                    </div>
                    <div className="anniv-text mb-3">
                        <textarea   className="form-control is-required" 
                                    placeholder="กรอกข้อความอวยพร" 
                                    id="textareaAnniv"
                                    name='textareaAnniv'
                                    disabled>
                        </textarea>
                        <div className="invalid-feedback">
                            กรุณากรอกคำอวยพร
                        </div>
                    </div>
                    <div className='btn-container text-center mt-4'>
                        <button className='btn btn-success px-4'
                                type='submit'    
                        > 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                            </svg>&ensp;บันทึก
                        </button>            
                    </div>
                </form>    
            </div>
        </div>
    )
}
