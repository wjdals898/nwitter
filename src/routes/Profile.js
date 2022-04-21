import { authService, dbService } from "fbase";
import { collection, orderBy, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Nweet from "components/Nweet";
import { updateProfile } from "@firebase/auth";

const Profile = ({userObj, refreshUser}) => {
    const {userName} = useParams();
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

    const getNweets = async () => {
        
        if (userObj.displayName === userName) {
            const myNweets = await query(collection(dbService, "nweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc"));
            onSnapshot(myNweets, (snapshot) => {
                const newArray = snapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                }));
                setNweets(newArray);
            });
        }
        else {
            const userNweets = await query(collection(dbService, "nweets"), where("creatorName", "==", userName), orderBy("createdAt", "asc"));
            onSnapshot(userNweets, (snapshot) => {
                const newArray = snapshot.docs.map((document) => ({
                    id: document.id,
                    ...document.data(),
                }));
                setNweets(newArray);
            });
        }
        
        //console.log(nweets.map((doc) => doc.data()));
    };
    
    // profile 컴포넌트가 렌더링된 이후 실행될 함수
    useEffect(() => {
        getNweets();
    }, [userName]);

    return (
        <div className="mainContainer">
            <div className="header">

                <span style={{fontSize: "20px", fontWeight:"bold",}}>{userName}의 Profile</span>
            </div>
            {userName === userObj.displayName && (
                <>
                    <form onSubmit={onSubmit} className="profileForm">
                        <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} autoFocus className="formInput" />
                        <input type="submit" value="Update Profile" className="formBtn" style={{marginTop: 10,}} />
                    </form>
                    <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</span>
                </>

            )}
            <div style={{marginTop: 10,}}>
                {nweets && nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner="true"/>
                ))}
            </div>
            
        </div>
    );
};

export default Profile;