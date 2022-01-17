import './FormSection.css';

function FormSection(){

    return(
        <div className="form-section-content col-8 col-xs-12 col-sm-12 col-md-8">
            <div className="card">
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="form-group text-start col-6">
                            <label htmlFor="agency" className='fw-bold'>สังกัด</label>
                            <select name="agency" id="agency" className='form-select'>
                                <option value="0">-- กรุณาเลือกสังกัด --</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="form-group text-start col-4">
                            <label htmlFor="prefixName" class="fw-bold text-secondary">คำนำหน้า</label>
                            <select name="prefixName" id="prefixName" className='form-select'>
                                <option value="0">-- เลือกคำนำหน้า --</option>
                            </select>
                        </div>
                        <div className="form-group text-start col-4">
                            <label htmlFor="prefixName" class="fw-bold text-secondary">ชื่อ</label>
                            <input type="text" name='fname' id='fname' className='form-control'/>
                        </div>
                    </div>
                    
                </div>

            </div>
        </div>


    );



}


export default FormSection;