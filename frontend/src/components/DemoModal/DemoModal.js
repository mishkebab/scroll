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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setShowModal(false);
        const newChannel = {"channel": {name: name, description: description, workspace_id: workspaceId}}
        return dispatch(createChannel(workspaceId, newChannel))
            .catch(async (res) => {
                let data;
                try {
                // .clone() essentially allows you to read the response body twice
                data = await res.clone().json();
                } catch {
                data = await res.text(); // Will hit this case if the server is down
                }
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

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
                <p className="modal-subheading">
                    To get the full Scroll experience, one needs to be logged in to different user accounts that share a workspace at the same time. To do so, follow these steps:
                </p>
                <p className="modal-subheading">
                    1. Open a new incognito window, copy and paste the following url, and navigate to it: 
                </p>
                <p className="modal-subheading">
                    2. Click on the Demo Login button at the top-right corner of the page and then click the Demo User 2 button at the bottom of the modal
                </p>
                <p className="modal-subheading">
                    3. Click the Launch Scroll button of the Hogwarts workspace
                </p>
                <p className="modal-subheading">
                    4. Open your other non-incognito window
                </p>
                <p className="modal-subheading">
                    5. Click the Demo User 1 button
                </p>
                <p className="modal-subheading">
                    6. Repeat step #3
                </p>
                <p className="modal-subheading">
                    7. Create a live interaction between both user accounts by sending messages to each other
                </p>
                <p className="modal-subheading">
                    Note:
                    <br/>
                    Only Demo User 1 can create, edit, and delete channels, since it is the owner of the Hogwarts workspace. 
                </p>
                <div class="modal-buttons">
                    <button className="modal-send-button" onClick={loginDemoOne}>Demo User One</button>
                    <button className="modal-send-button" onClick={loginDemoTwo}>Demo User Two</button>
                </div>
            </div>
          </Modal>
        )}
      </>
    );
  }
  
  export default DemoModal;
