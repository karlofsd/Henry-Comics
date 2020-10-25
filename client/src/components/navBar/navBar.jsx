import React, {Fragment, useEffect, useState} from 'react'
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
import {Link, useHistory} from 'react-router-dom'
import logo from './img/logo.png'
import {useDispatch, useSelector} from 'react-redux'
import {getProducts,filterCategory} from '../../redux/productos'
import {getCategory} from '../../redux/categorias'
import {logOut} from '../../redux/users'
import Axios from 'axios'

const NavBar = ({/* categories, */}) => {
    const history = useHistory()
    const user = useSelector(store => store.userState.userLogin)
    const categories = useSelector( store => store.categoryState.categories)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(()=> {
        dispatch(getCategory()) 
    },[])

    const handleLogOut = async() => {
      const {data} = await Axios.get(`http://localhost:3001/user/logout`, { withCredentials: true })
      console.log('deslogueo',data)
      dispatch(logOut())
      return history.push('/login')
    }

    return(
        <div>
        <Navbar color="dark" light expand="md">
          
          <NavbarBrand >
              <div className="divlogo">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} className="logo" />
                    </Link>
              </div>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>

            <Nav className={"align-items-center " + (!user.login && "mr-auto")} navbar>
              <NavItem>
                <Link to="/" id="redtext" className="px-2">
                    Home 
                    <span className="sr-only">(current)</span>
                </Link>
              </NavItem>

              <NavItem>
              <Link to="/catalogo" onClick={()=> dispatch(getProducts())} className="text-light px-2">
                  Catálogo
              </Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="text-light px-2">
                        Categorias
                    </DropdownToggle>
                    <DropdownMenu left>
                        {categories && categories.map(c =>
                        <Link to={`/catalogo/category/${c.id}`} /* onClick={()=> dispatch(filterCategory(c.id))} */>
                        <DropdownItem>{c.name}</DropdownItem>
                        </Link>)}
                    </DropdownMenu>
                </UncontrolledDropdown>

              {user.isAdmin && <Fragment>
              <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="text-light px-2">
                        Admin
                    </DropdownToggle>
                    <DropdownMenu left>
                        <Link to='/admin'>
                        <DropdownItem>Panel</DropdownItem>
                        </Link>
                        <Link type='button' onClick={handleLogOut}>
                        <DropdownItem>Cerrar sesión</DropdownItem>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
              </Fragment>}
              
              {!user.id && <Fragment>
              <NavItem>
                    <Link to="/login" className="text-light px-2">
                    Iniciar Sesión
                    </Link>
              </NavItem>
              
              <NavItem>
                    <Link to="/signup" className="text-light px-2">
                    ¡Crea tu cuenta!
                    </Link>
              </NavItem>
              </Fragment>}
              {(user.id && !user.isAdmin) && <Fragment>
              <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret className="text-light px-2">
                        User
                    </DropdownToggle>
                    <DropdownMenu left>
                        <Link to='/user'>
                        <DropdownItem>Perfil</DropdownItem>
                        </Link>
                        <Link type='button' onClick={handleLogOut}>
                        <DropdownItem>Cerrar sesión</DropdownItem>
                        </Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
              </Fragment>}
            </Nav>
              {user.id && <div className='saludo'>Hola, {user.name || user.username}!</div>}
          <Buscar /*click={click}*/ className="pl-5"/>
          </Collapse>
        </Navbar>
      </div>
    )
}

export default NavBar;