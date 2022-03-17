import { authService } from "fbase";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser, faBell, faEnvelope, faListAlt, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faHome, faHashtag, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { Navbar,Nav,NavDropdown, Container, Button, Row, Col, OverlayTrigger, Popover, Modal, } from 'react-bootstrap';

const Navigation = ({userObj}) => {
    const [modalShow, setModalShow] = useState(false);
    const history = useNavigate();

    const onLogOutClick = () =>{
        authService.signOut();
        history("/");
    };

    return (
        <Container style={{bolder: "1px solid", }}>
            <Navbar  className="navbar" expand="lg" style={{width: "100%",}}>
                <Container className="nav" style={{float: "left", textAlign: "left",}}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto flex-column">
                        <Link to="/" className="navLogo"><FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} /></Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faHome} />&nbsp;&nbsp;&nbsp;홈</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faHashtag} />&nbsp;&nbsp;&nbsp;탐색하기</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faBell} />&nbsp;&nbsp;&nbsp;알림</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faEnvelope} />&nbsp;&nbsp;&nbsp;쪽지</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faBookmark} />&nbsp;&nbsp;&nbsp;북마크</Link>
                        <Link to="/"  className="navLink"><FontAwesomeIcon icon={faListAlt} />&nbsp;&nbsp;&nbsp;리스트</Link>
                        <Link to="/profile"  className="navLink"><FontAwesomeIcon icon={faUser} />&nbsp;&nbsp;&nbsp;프로필</Link>
                    </Nav>
                    </Navbar.Collapse>
                    <Button className="tweetBtn">트윗하기</Button>
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
                    <Row>
                        <Col width="20%">
                            <img src={userObj.photoURL} width="50px" height="50px" className="myImg"/>
                        </Col>
                        <Col width="60%" style={{margin: "8px 0px",}}>
                            <Row>
                                <div style={{fontSize: "16px", fontWeight: "bold",}}>{userObj.displayName ? `${userObj.displayName}` : "User"}</div>
                            </Row>
                            <Row>
                                <div>{userObj.email}</div>
                            </Row>
                        </Col>
                        <Col width="20%" style={{ display: "flex", alignItems: "center", }}>
                            <div ><FontAwesomeIcon icon={faEllipsisH}/></div>
                        </Col>
                    </Row>
                </div>    
            </OverlayTrigger>
            
        </Container>
        
    );
};

export default Navigation;