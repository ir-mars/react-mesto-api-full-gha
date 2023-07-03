import logo from "../images/header-logo.svg"

function Header ({ children }) {
    return (
      <header className="header">
        <img
          className="header__logo" 
          src={logo}
          alt="надпись Место" />
        {children}  
      </header>
    )
}

export default Header;