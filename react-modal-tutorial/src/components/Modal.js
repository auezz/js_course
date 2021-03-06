import React, {useRef, useEffect, useCallback} from 'react'
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components'
import { MdClose, MdCancel } from 'react-icons/md'


const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalWrapper = styled.div`
    width: 800px;
    height: 500px;
    box-shadow: 0 5px 16px rgba(0,0,0,0.2);
    background: #fff;
    color: #000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`;

const ModalImg = styled.img`
    width: 100%;
    height: inherit;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
    background: #000;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;

    p{
        margin-bottom: 1rem;
    }

    button{
        padding: 10px 24px;
        background: #141414;
        color: #fff;
        border: none;
    }
`;

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`; 



export default function Modal(props) {
    const {showModal, setShowModal} = props;
    const modalRef = useRef();
    const styles = useSpring({ opacity: showModal ? 1 : 0 })
    const animation = useSpring({
        // config:{
        //     duration: 30
        // },
        // opacity: 1,
        // transform: showModal ? `translateY(100%)` : `translateY(150%)`
        // // opacity: showModal ? 1 : 0
    });

    return (
        <>
            {showModal?
                (
                    <Background>
                        <animated.div style={styles}>    
                            <ModalWrapper showModal={showModal}>
                                <ModalImg src={require('./download.png')}
                                        alt="doyoung"  
                                />
                                <ModalContent>
                                    <h1>Are You Ready?</h1>
                                    <p>test test</p>
                                    <button>Join Now</button>
                                </ModalContent>
                                <CloseModalButton aria-label='close modal' 
                                    onClick={()=>setShowModal(prev=>!prev)}                    
                                />
                            </ModalWrapper>
                        </animated.div>
                    </Background>

                )
            
            :null}
            
        </>
    )
}
