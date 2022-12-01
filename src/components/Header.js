import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import './style.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete';
import { DLT } from '../redux/actions/action';


export const Header = () => {
    const getData = useSelector((state) => state.cartreducer.carts) //to get data from reducer "context Api" "useSelector gets data from reducer while useContext gets data fro context"
    console.log(getData)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const dispatch = useDispatch()
    const dlt = (id) => {
        dispatch(DLT(id))
    }
    const [price, setPrice] = useState(0)
    const total = () =>{
        let price = 0
        getData.map((ele, k) => {
        price =ele.price  * ele.qnty + price
        })
        setPrice(price)
    }
    useEffect(() => {
        total()
    }, [total])
    
        return (
            <>
                <Navbar bg="dark" variant="dark" className='Navbar' >
                    <Container>
                        <Link to='/cart' className='text-decoration-none text-light' >Resturaunt Menu</Link>
                        <Nav className="me-auto">
                            <Link to='/' className='text-decoration-none text-light mx-3' >Menu Details</Link>
                        </Nav>
                        <Badge badgeContent={getData.length} color="primary">
                            <ShoppingCartIcon className='ShoppingCart'
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            />
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {
                                    getData.length ?
                                    <div className='card_details'>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Photo</th>
                                                    <th>Resturaunt Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    getData.map((e) => {
                                                        return(
                                                            <>
                                                              <tr>
                                                              <Link to= {`/cart/${e.id}`} onClick={handleClose}> <td><img src={e.imgdata} style ={{width:"5rem", height: "5rem"}}></img></td></Link>
                                                                <td>
                                                                    <p>{e.rname}</p>
                                                                    <p>Price : Rs {e.price}</p>
                                                                    <p>Quantity : {e.qnty}</p>
                                                                   
                                                                </td>
                                                                <td>
                                                                <p>< DeleteIcon style={{color:"red",fontSize:20,cursor:"pointer"}}onClick={() => dlt(e.id)}/></p>
                                                                </td>
                                                              </tr>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            <p className='Total_price'>Total Price : Rs{price}</p>
                                        </Table>

                                    </div> :
                                        <div className='card_details d-flex justify-content-center align-items-center'>
                                        <ClearIcon className='ClearIcon'
                                        onClick={handleClose}
                                        />
                                       <p className='ClearIcon_p'>Your cart is empty</p>
                                       <img src='./cart.gif' className='ShoppingCartIcon_img'></img>
                                       </div>
                                }
                    
                            </Menu>
                        </Badge>
                    </Container>
                </Navbar>
            </>
        )
    }
