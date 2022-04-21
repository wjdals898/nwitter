import { Container, Row, Col } from "react-bootstrap";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Header from "./Header";
import Navigation from "./Navigation";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            <Container>
                <Row>
                    <Col sm="2" md="3" style={{height: "100%", position: "fixed", top:0}}>
                        {isLoggedIn && <Navigation style={{}} userObj={userObj} />}
                    </Col>
                    <Col sm="8" md="6" >
                        <Routes>
                            {isLoggedIn ? (
                                <>
                                    <Route exact path="/" element={<div><Home userObj={userObj}/></div>} />
                                    <Route exact path="/profile/:userName" element={<div><Profile refreshUser={refreshUser} userObj={userObj}/></div>}/>
                                </>
                            ) : (
                                <Route path="/" element={<Auth/>} />
                            )}
                        </Routes>
                    </Col>
                    <Col sm="2" md="3">
                    
                    </Col>
                </Row>
            </Container>
        </Router>
    );
};

export default AppRouter;