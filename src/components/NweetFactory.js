import { dbService, storageService } from "fbase";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if (nweet === "") {
            return;
        }
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
            const response = await uploadString(attachmentRef, attachment, 'data_url');
            attachmentUrl = await getDownloadURL(ref(attachmentRef));
        }
        await addDoc(collection(dbService, "nweets"), { 
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            creatorPhotoURL: userObj.photoURL,
            creatorName: userObj.displayName,
            creatorEmail: userObj.email,
            attachmentUrl,
        });
        setNweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target : {value},
        } = event;
        setNweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        if (Boolean(theFile)) {
            reader.readAsDataURL(theFile);
        }
    };

    const onClearAttachment = () => setAttachment("");

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <img src={userObj.photoURL} style={{width: "50px", height: "50px", borderRadius: "50px"}}/>
                <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="무슨 일이 일어나고 있나요?" maxLength={120}/> {/*트윗 글자 수 120자로 제한*/}
                <input type="submit" value="트윗하기" className="factoryInput__arrow"/>
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input className="" id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0,}} />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img src={attachment} style={{backgroundImage: attachment,}} />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
            
        </form>
    );
};

export default NweetFactory;