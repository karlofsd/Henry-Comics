import React, {useEffect, useState} from 'react'
import Buscar from '../searchBar/searchBar'
import {
    Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap'
import {Link} from 'react-router-dom'
import logo from './img/logo.png'
import {useDispatch, useSelector} from 'react-redux'
import {getProducts,filterCategory} from '../../redux/productos'
import {getCategory} from '../../redux/categorias'

const NavBar = ({/* categories, */click,get}) => {
    const categories = useSelector( store => store.categoryState.categories)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(()=> {
        dispatch(getCategory())
    },[])

    return(
        <div>
        <Navbar color="dark" light expand="md">

          <NavbarBrand href="/">
              <div className="divlogo">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} className="logo" />
                    </Link>
              </div>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>

            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/" id="redtext">
                    Home 
                    <span className="sr-only">(current)</span>
                </NavLink>
              </NavItem>

              <NavItem>
              <NavLink href="/catalogo" onClick={()=> dispatch(getProducts())} className="text-light">
                  Catalogo
              </NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="text-light">
                        Categories
                    </DropdownToggle>
                    <DropdownMenu left>
                        {categories && categories.map(c =>
                        <Link to={`/catalogo/category/${c.id}`} /* onClick={()=> dispatch(filterCategory(c.id))} */>
                        <DropdownItem>{c.name}</DropdownItem>
                        </Link>)}
                    </DropdownMenu>
                </UncontrolledDropdown>
              
              <NavItem>
                    <NavLink href="/carrito" className="text-light">
                    Carrito
                    </NavLink>
              </NavItem>

              <NavItem>
                    <NavLink href="/admin" className="text-light">
                    Admin Panel
                    </NavLink>
              </NavItem>

              <NavItem>
                    <NavLink href="/users/add" className="text-light">
                    ¡Crea tu cuenta!
                    </NavLink>
              </NavItem>
            </Nav>
          <Buscar click={click} className="pl-5"/>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default NavBar;