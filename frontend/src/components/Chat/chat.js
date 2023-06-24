import { useState } from "react";
import { createMessage } from "../../store/messages";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const Chat = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const { userId } = useParams();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {content: message, author_id: userId, }
        dispatch(createMessage(message))
    }

    return (
        <form>
            <textarea 
                placeholder="write a message" 
                value={message} 
                onChange={e => setMessage(e.currentTarget.value)}>
            </textarea>
            <button type="submit" onClick={handleSubmit}>Send Message</button>
        </form>
    )
}

export default Chat;