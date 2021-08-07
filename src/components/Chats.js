import React, {  useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState();
    
    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'});
    }
    
    useEffect(() => {
        if (!user || user === null) {
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "327b7eb0-c874-4fa2-ac6f-076796b45e18",
                "username": user.email,
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);

                        axios.post('https://api.chatengine.io/users',
                            formdata,
                        { headers: { "private-key" : "7d08fea7-7937-4279-a3db-1e82fdd9bfa9"}})
                    })
                    .then(() => setLoading(false))
                    .catch((error) => {console.log(error);});
        })
    }, [user, history]);

    if (!user || loading) return 'Loading....';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    HaLo Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh  - 66px)"
                projectID='327b7eb0-c874-4fa2-ac6f-076796b45e18'
                userName={user.email}
                userSecret={user.uid}
		/>
        </div>
    );
}

export default Chats;