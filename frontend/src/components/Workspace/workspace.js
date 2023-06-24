import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "../SideBar/sideBar";
import { useSelector } from "react-redux";
import Chat from "../Chat/chat";

const Workspace = () => {
    const { workspaceId } = useParams();
    const { userId } = useParams();
    const { channelId } = useParams();
    console.log(workspaceId)
    console.log(userId)

    const sessionUser = useSelector(state => state.session.user)

    return (
        <>
            <SideBar />
            <Chat />
        </>
    )
}

export default Workspace;