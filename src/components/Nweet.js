import { dbService, storageService } from "fbase";
import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const [isHovering, setIsHovering] = useState(false);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(dbService, "nweets", nweetObj.id));
            if (nweetObj.attachmentUrl !== "") {
                await deleteObject(ref(storageService, nweetObj.attachmentUrl));
            }
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, "nweets", nweetObj.id), {text:newNweet});
        setEditing(false);
    }

    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input onChange={onChange} value={newNweet} required placeholder="Edit your nweet" autoFocus className="formInput"/>
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
            ) : (
                <div className="nweetContainer">
                    <div className="profileImg" style={{float: "left"}}>
                        <img src={nweetObj.creatorPhotoURL} />
                    </div>
                    <div style={{float: "left", width: "85%"}}>
                        <div>
                            <Link to={"/profile/"+nweetObj.creatorName} style={{fontWeight: "bold"}}>{nweetObj.creatorName}</Link>
                            <span style={{color: "gray", marginLeft: "10px"}}>{nweetObj.creatorEmail}</span>
                        </div>
                        <div>
                            <p>{nweetObj.text}</p>
                        </div>
                        <div>
                            {nweetObj.attachmentUrl && (
                                <img src={nweetObj.attachmentUrl} width="100%" style={{borderRadius: "20px"}}/>
                            )}
                        </div>
                        <div className="tweetIcons" style={{ width: "99%", textAlign: "center"}}>
                            <p style={{float: "left", width: "33%"}} className="comment">
                                <FontAwesomeIcon icon={faComment} className="tweetIcon commentIcon"/>
                                <span className="commentNum">comment수</span>
                            </p>
                            <p style={{float: "left", width: "33%"}} className="retweet">
                                <FontAwesomeIcon icon={faRetweet} className="tweetIcon retweetIcon"/>
                                <span className="retweetNum">리트윗수</span>
                            </p>
                            <p style={{float: "left", width: "33%"}} className="heart">
                                <FontAwesomeIcon icon={faHeart} className="tweetIcon heartIcon"/>
                                <span className="heartNum">마음수</span>
                            </p>
                            <p style={{clear: "both"}}></p>
                        </div>
                        
                    </div>
                    <p style={{clear: "both"}}></p>
                </div>
            )}
        </div>
    );
};

export default Nweet;