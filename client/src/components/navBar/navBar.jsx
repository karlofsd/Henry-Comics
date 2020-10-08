import React, {useState} from 'react'
import Buscar from '../searchBar/searchBar'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap'
import {Link} from 'react-router-dom'

const NavBar = ({categories,click}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">LOGO</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/catalogo">Catalogo</Link>
                    </li>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Categories
                        </DropdownToggle>
                        <DropdownMenu left>
                            {categories && categories.map(c =><DropdownItem>
                            <Link to={`/catalogo/category/${c.id}`}>{c.name}</Link>
                            </DropdownItem>)}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <li className="nav-item">
                        <Link className="nav-link" to="/carrito">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">Admin Panel</Link>
                    </li>
                </ul>
                <Buscar click={click}/>
            </div>
        </nav>
    )
}

export default NavBar;