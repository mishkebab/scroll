import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDM } from "../../store/dms";

const DirectMessage = () => {
    const dispatch = useDispatch();
    const { dmId } = useParams();
    const { workspaceId } = useParams();
    useEffect(() => {
        dispatch(fetchDM(workspaceId, dmId))
    }, [])
    
    // const dm = useSelector(state => Object.values(state.dms).filter(channel => channel.id == channelId))
    // console.log(dm)
    
    const messages = useSelector(state => Object.values(state.messages))

    // const { userId } = useParams();
    // const sessionUser = useSelector(state => state.session.user)

    // Object.values(channel[0]).map(item => console.log(item))
    // const messages = Object.values(channel[0].messages)

    return (
        <div>
            <ul>
                {messages.map(message => 
                    <p>{message.content}</p>
                )}
            </ul>        
        </div>
    )
}

export default DirectMessage