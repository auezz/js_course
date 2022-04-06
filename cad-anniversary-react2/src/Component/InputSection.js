import React from 'react'
import './InputSection.css';
export default function InputSection(props) {
    const {ministryList, onMinistryChange} = props;

    return (
        <div className='input-section card w-100'>
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
                    <div className="w-50"></div>

                </div>
            </div>
        </div>
    )
}
