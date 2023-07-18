import { Modal } from "../../context/Modal";
import { AiOutlinePlus } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import { createChannel } from "../../store/channels";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import './DemoModal.css';


function DemoModal(props) {
    const [showModal, setShowModal] = useState(false);
    const { workspaceId } = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const loginDemoOne = () => {
        dispatch(sessionActions.login({ email: "hermione@hogwarts.edu", password:"password" }));
    }

    const loginDemoTwo = () => {
        dispatch(sessionActions.login({ email: "dumbledore@hogwarts.edu", password:"password" }));
    }
  
    return (
      <>
        <button className={props.class} onClick={() => setShowModal(true)}>Try a Demo</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="demo-modal-container">
                <h1 className="demo-modal-heading">Experience Scroll!</h1>
                <p className="demo-modal-subheading">
                    To get the full Scroll experience, one needs to be logged in to different user accounts that share a workspace at the same time. To do so, follow these steps:
                </p>
                <p className="demo-modal-subheading">
                    1. Open a new incognito window, copy and paste the following url, and navigate to it: <span className="demo-modal-emphasis">https://misha-scroll-a1d0e552b8c2.herokuapp.com/</span>
                </p>
                <p className="demo-modal-subheading">
                    2. Click on the <span className="demo-modal-emphasis">Demo Login</span> button at the top-right corner of the page and then click the <span className="demo-modal-emphasis">Demo User 2</span> button at the bottom of the modal
                </p>
                <p className="demo-modal-subheading">
                    3. Click the  <span className="demo-modal-emphasis">Launch Scroll</span> button of the  <span className="demo-modal-emphasis">Hogwarts</span> workspace
                </p>
                <p className="demo-modal-subheading">
                    4. Open your other non-incognito window
                </p>
                <p className="demo-modal-subheading">
                    5. Click the  <span className="demo-modal-emphasis">Demo User 1</span> button
                </p>
                <p className="demo-modal-subheading">
                    6. Repeat step #3
                </p>
                <p className="demo-modal-subheading">
                    7. Create a live interaction between both user accounts by sending messages to each other
                </p>
                <p className="demo-modal-subheading">
                    <span className="demo-modal-emphasis">Note:</span>
                    <br/>
                    Only <span className="demo-modal-emphasis">Demo User 1</span> can create, edit, and delete channels, since it is the owner of the  <span className="demo-modal-emphasis">Hogwarts</span> workspace. 
                </p>
                <div class="demo-modal-buttons">
                    <button className="demo-modal-user-button" onClick={loginDemoOne}>Demo User One</button>
                    <button className="demo-modal-user-button" onClick={loginDemoTwo}>Demo User Two</button>
                </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
  
  export default DemoModal;
