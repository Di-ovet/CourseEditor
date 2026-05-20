import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo_head_1.png";
import "../styles.css";

function TopBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <Navbar expand="lg" className="navbar">
      <div className="nav-container">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Валуйский колледж" className="brand-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links">
            <Nav.Link as={Link} to="/" className="nav-link">
              Курсы
            </Nav.Link>
            <Nav.Link href="#About" className="nav-link">
              Уроки
            </Nav.Link>
            <Nav.Link href="#About" className="nav-link">
              Проверка заданий
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title="Профиль" className="basic-dropdown">
              <NavDropdown.Item href="#ChangeMode">
                Изменить режим
              </NavDropdown.Item>
              <NavDropdown.Item href="#Profile">
                Личный кабинет
              </NavDropdown.Item>
              {user && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Выйти ({user.email})
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
export default TopBar;
