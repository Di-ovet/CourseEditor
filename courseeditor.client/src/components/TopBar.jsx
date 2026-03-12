import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../styles.css";

function TopBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand id="basic-dropdown" href="#home">
          {/* placeholder logo; swap src when real asset available */}
          <img src="/logo-placeholder.png" alt="Brand" className="brand-logo" />
        </Navbar.Brand>
        <Nav className="navbar">
          <Nav.Link href="#Home" id="basic-dropdown" className="navbar-link">
            Курсы
          </Nav.Link>
          <Nav.Link href="#About" id="basic-dropdown" className="navbar-link">
            Уроки
          </Nav.Link>
          <Nav.Link href="#About" id="basic-dropdown" className="navbar-link">
            Проверка заданий
          </Nav.Link>
          <NavDropdown title="Профиль" id="basic-dropdown">
            <NavDropdown.Item href="#ChangeMode">
              Изменить режим
            </NavDropdown.Item>
            <NavDropdown.Item href="#Profile">Личный кабинет</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#Logout">Выйти</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default TopBar;
