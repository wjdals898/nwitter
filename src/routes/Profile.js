import { authService, dbService } from "fbase";
import { collection, orderBy, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Nweet from "components/Nweet";
import { updateProfile } from "@firebase/auth";

const Profile = ({userObj, refreshUser}) => {
    const [nweets, setNweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? userObj.displayName : "");
    const history = useNavigate();

    const onLogOutClick = () =>{
        authService.signOut();
        history("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName });
            refreshUser();
        }
    };

    const getMyNweets = async () => {
        const myNweets = await query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc"));
        onSnapshot(myNweets, (snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
        //console.log(nweets.map((doc) => doc.data()));
    };

    // profile 컴포넌트가 렌더링된 이후 실행될 함수
    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
            <div>
                {nweets && nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner="true"/>
                ))}
            </div>
        </>
    );
};

export default Profile;