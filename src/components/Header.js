import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Container className="Header">
            <Row>
                <Col xs="2" md="3" style={{paddingLeft: "50px",}}>
                    <Link to="/"><FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} style={{fontSize: "30px"}} /></Link>
                </Col>
                <Col xs="8" md="6">
                    <h4 style={{fontSize: "20px", fontWeight: "bold",}}>홈</h4>
                </Col>
                <Col xs="2" md="3">
                    <form>
                        <input type="text" />
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Header;