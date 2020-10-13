import React, {useState} from 'react'
import Buscar from '../searchBar/searchBar'
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap'
import {Link} from 'react-router-dom'
import logo from './img/logo.png'

const NavBar = ({categories,click,get}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return(

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top fixed">
            <div className="divlogo"><Link className="navbar-brand" to="/"><img src={logo} className="logo" /></Link></div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link id="redtext" className="nav-link" to="/"> Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/catalogo" onClick={()=>get()}>Catalogo</Link>
                    </li>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Categories
                        </DropdownToggle>
                        <DropdownMenu left>
                            {categories && categories.map(c =>
                            <Link to={`/catalogo/category/${c.id}`}>
                                <DropdownItem>{c.name}</DropdownItem>
                            </Link>)}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <li className="nav-item">
                        <Link className="nav-link" to="/carrito">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">Admin Panel</Link>
                    </li>
                </ul>
                <div className="text-white font-weight-bold henryComics container d-flex justify-content-center col-md-2 footerBorder ml-30vw"><h3>HENRY COMICS</h3></div>
                <Buscar click={click}/>
            </div>
        </nav>
    )
}

export default NavBar;