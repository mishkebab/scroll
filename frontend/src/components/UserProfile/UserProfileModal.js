import * as sessionActions from '../../store/session';
import { Modal } from "../../context/Modal";
import { AiOutlinePlus } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import { createChannel } from "../../store/channels";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
// import './newChannel.css'

function UserProfileModal() {
    const sessionUser = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const [display_name, setDisplayName] = useState(sessionUser.displayName);
    const [title, setTitle] = useState(sessionUser.title);
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setShowModal(false);
        dispatch(sessionActions.update({ display_name, title }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    console.log(res)
                    data = await res.text();
                }
                
                if (data?.errors) setErrors(data.errors);
                else if (data) setErrors(data);
            })     
    }
  
    return (
      <>
        <button className="nav-bar-dropdown" onClick={() => setShowModal(true)}>
            Edit Profile
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="modal-container">
                <form onSubmit={handleSubmit}>
                    <h1 className="modal-heading">Edit Profile</h1>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <div class="modal-inputs">
                        <div class="modal-input-container">
                            <label for="nameInput" class="modal-input-label">Display Name</label>
                            <input
                            className="modal-input"
                            id="nameInput"
                            type="text"
                            value={display_name}
                            onChange={(e) => setDisplayName(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div class="modal-inputs">
                        <div class="modal-input-container">
                            <label for="nameInput" class="modal-input-label">Title</label>
                            <input
                            className="modal-input"
                            id="nameInput"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="modal-buttons">
                        <button className="modal-send-button" id="modal-cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                        <button type="submit" className="modal-send-button" >Create Channel</button>
                    </div>
                </form>
            </div>
          </Modal>
        )}
      </>
    );
  }
  
  export default UserProfileModal;

//   {() => {setNewMessage(message.content); toggleVisibility(message.id)}}