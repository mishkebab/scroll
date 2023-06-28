import { Modal } from "../../context/Modal";
import { AiOutlinePlus } from 'react-icons/ai';
import { useParams } from "react-router-dom";
import { createChannel } from "../../store/channels";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './newChannel.css'

function NewChannelModal() {
    const [showModal, setShowModal] = useState(false);
    const { workspaceId } = useParams();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
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
  
    return (
      <>
        <button class="sidebar-button-image-container" onClick={() => setShowModal(true)}>
            <AiOutlinePlus />
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div className="modal-container">
                <form onSubmit={handleSubmit}>
                    <h1 className="modal-heading">Create a channel</h1>
                    <p className="modal-subheading">
                        Channels are where your members communicate. They're best when organized around a topic - #yule-ball-budget, for example
                    </p>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                    <div class="modal-inputs">
                        <div class="modal-input-container">
                            <label for="nameInput" class="modal-input-label">Name</label>
                            <input
                            className="modal-input"
                            id="nameInput"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                    <div class="modal-inputs">
                        <div class="modal-input-container">
                            <label for="nameInput" class="modal-input-label">Description</label>
                            <input
                            className="modal-input"
                            id="nameInput"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
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
  
  export default NewChannelModal;

//   {() => {setNewMessage(message.content); toggleVisibility(message.id)}}