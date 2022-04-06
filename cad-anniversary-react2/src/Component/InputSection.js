import React from 'react'
import './InputSection.css';
import Cleave from 'cleave.js/react';
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.th';
export default function InputSection(props) {
    const {ministryList, onMinistryChange, ministryId, departmentList, prefixList, annivList} = props;
    const wishTextRegEx = /&#[0-9]+;/g;
    console.log('annivList: ', annivList);


    const onSelectchange = (e)=>{
        console.log('onSelectChange: ', e);
        if(e.target.id==="selectMinistryList"){
            const departmentElem = document.getElementById('selectDepartmentList');
            departmentElem.value = 0;
        }


    }


    return (
        <div className='input-section card w-100 mb-3'>
            <div className="card-header">
                Input Section
            </div>
            <div className="card-body">
                <div className="d-flex gap-3 mb-3">
                    <div className="w-50">
                        <label htmlFor="selectMinistryList" className="form-label mb-1">ประเภท/สังกัด</label>
                        <select name="selectMinistryList" 
                                id="selectMinistryList"
                                className='form-select'
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
                    </div>
                    <div className="w-50">
                        <label htmlFor="selectDepartmentList" className='form-label mb-1'>ชื่อหน่วยงาน</label>        
                        <select name="selectDepartmentList" 
                                id="selectDepartmentList"
                                className='form-select'>
                            <option value={0} defaultValue>-- กรุณาเลือก --</option>
                            {
                                departmentList.map((data, index)=>(
                                    <option key={index} value={data.gov_id}>{data.gov_name}</option>

                                ))        

                            }        
                        </select>    

                    </div>
                </div>
                <div className="d-flex gap-3 mb-3 user-info-input">
                    <div className="prefix">
                        <label htmlFor="selectPrefixName" className='form-label text-nowrap mb-1'>คำนำหน้า</label>
                        <select name="selectPrefixName" 
                                id="selectPrefixName"
                                className='form-select'>
                            <option value={0} defaultValue>-- กรุณาเลือก --</option>
                            {
                                prefixList.map((data, index)=>(
                                    <option key={index} value={data.id}>{data.prefix_name_short}</option>
                                ))
                            }            
                        </select>        

                    </div>
                    <div className="fname">
                        <label htmlFor="inputFirstName" className='form-label mb-1'>ชื่อ</label>
                        <input type="text" className='form-control' 
                               id="inputFirstName" name='inputFirstName'
                        />            
                    </div>            
                    <div className="lname">
                        <label htmlFor="inputLastName" className='form-label mb-1'>นามสกุล</label>
                        <input type="text" className='form-control' 
                               id="inputLastName" name='inputLastName'
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPosition" className='form-label mb-1'>ตำแหน่ง</label>
                    <input type="text" className='form-control'
                           id="inputPosition" name='inputPosition' 
                    />
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
                    </div>
                    <div className="email w-50">
                        <label htmlFor="inputEmail" className='form-label mb-1'>อีเมล</label>
                        <input type="text" className='form-control'
                                id="inputEmail" name='inputEmail'
                        />
                    </div>
                </div>
                <div className="d-flex gap-3 mb-3">
                    <div className="select-anniv-title">คำอวยพร</div>
                    <div className='select-anniv'>
                        <select name="selectAnniv" id="selectAnniv" className='form-select'>
                            <option value={0} defaultValue>-- เลือกคำอวยพร --</option>
                            {
                                annivList.map((data, index)=>(
                                    <option key={index} value={data.id_word}>{(data.word).replace(wishTextRegEx,'')}</option>
                                ))
                            }        
                        </select>
                    </div>
                </div>
                <div className="anniv-text">
                    <textarea   className="form-control" 
                                placeholder="กรอกข้อความอวยพร" 
                                id="textareaAnniv"
                                name='textareaAnniv'
                                disabled>
                    </textarea>
                </div>
            </div>
        </div>
    )
}
