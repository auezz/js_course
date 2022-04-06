import { React ,useState, useEffect } from 'react'
import Axios from 'axios';
import './VisitorList.css'
export default function VisitorList(props) {
    const { visitList } = props;
    
    
    return (
        <div className='main-visitor-list'>
            <p className="text-title">รายนามผู้ร่วมอวยพร ( {visitList.length} ราย )</p>
            <div className="visitor-list">
                {
                    visitList.map((elm, index)=>(
                        <div className="card-box" key={index}>
                            <div className="card-thumbnail">

                            </div>
                            <div className="card-body">
                                {elm.wish_text}
                            </div>

                        </div>    

                    ))
                }
            </div>

        </div>
    )
}

