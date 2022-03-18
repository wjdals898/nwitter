import { authService } from "fbase";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faBell, faEnvelope, faListAlt, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faHome, faHashtag, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Navbar,Nav, Container, Button, Row, Col, OverlayTrigger, Popover, Modal, } from 'react-bootstrap';

const Navigation = ({userObj}) => {
    const [modalShow, setModalShow] = useState(false);
    const history = useNavigate();

    const onLogOutClick = () =>{
        authService.signOut();
        history("/");
    };

    return (
        <Container className="navContainer">
            <Navbar  className="navbar" expand="lg" style={{width: "100%", }}>
                <Container className="nav" style={{float: "left", textAlign: "left",}}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto flex-column">
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faHome} />&nbsp;&nbsp;&nbsp;홈</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faHashtag} />&nbsp;&nbsp;&nbsp;탐색하기</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faBell} />&nbsp;&nbsp;&nbsp;알림</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;쪽지</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faBookmark} />&nbsp;&nbsp;&nbsp;북마크</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faListAlt} />&nbsp;&nbsp;&nbsp;리스트</Link>
                        <Link to="/profile"  className="navLink"><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;프로필</Link>
                        <Button className="tweetBtn">트윗하기</Button>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                
            </Navbar>
            <OverlayTrigger
                trigger="click"
                key="top"
                placement="top"
                overlay={
                    <Popover id="popover-positioned-top">
                    <Popover.Header as="h3"></Popover.Header>
                    <Popover.Body>
                        <span onClick={() => setModalShow(true)} style={{cursor: "pointer",}}>{userObj.displayName} 계정에서 로그아웃</span>
                        
                        <Modal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            size="md"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Body>
                                    <h4><FontAwesomeIcon icon={faTwitter}/></h4>
                                    <h5>
                                        <strong>{userObj.displayName} 계정에서 로그아웃할까요?</strong>
                                    </h5>
                                    <Button onClick={onLogOutClick}>로그아웃</Button>
                                    <Button onClick={() => setModalShow(false)}>취소</Button>
                            </Modal.Body>
                        </Modal>
                    </Popover.Body>
                    </Popover>
                }
            >
                <div className="myProfile">
                    <table>
                        <tbody >
                            <tr>
                                <td rowSpan={2}><img src={userObj.photoURL} width="40px" height="40px" className="myImg"/></td>
                                <td>
                                    <div style={{fontSize: "16px", fontWeight: "bold",}}>{userObj.displayName ? `${userObj.displayName}` : "User"}</div>
                                </td>
                                <td rowSpan={2}>
                                    <div><FontAwesomeIcon icon={faEllipsisH}/></div>
                                </td>
                            </tr>
                            <tr >
                                <td><div>{userObj.email}</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>    
            </OverlayTrigger>
            
        </Container>
        
    );
};

export default Navigation;