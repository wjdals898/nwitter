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
                <div className="container" style={{position: "fixed", top: 0, }}>
                    <Header />
                </div>
                <Row >
                    <Col sm="4" md="3" style={{height: "100%", position: "fixed", top:0}}>
                        {isLoggedIn && <Navigation style={{}} userObj={userObj} />}
                    </Col>
                    <Col sm="10" md="6">
                        <Routes>
                            {isLoggedIn ? (
                                <>
                                    <Route exact path="/" element={<div style={{ width: "100%", margin: "0 auto", marginTop: 80, display: "flex", justifyContent: "center", }}>
                                        <Home userObj={userObj}/></div>} />
                                    <Route path="/profile" element={<div style={{ width: "100%", margin: "0 auto", marginTop: 80, display: "flex", justifyContent: "center", }}>
                                        <Profile refreshUser={refreshUser} userObj={userObj}/></div>}/>
                                </>
                            ) : (
                                <Route path="/" element={<Auth/>} />
                            )}
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
};

export default AppRouter;