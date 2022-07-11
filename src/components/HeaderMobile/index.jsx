import React , {useState,useEffect} from 'react'
import './HeaderMobile.scss'

import axios from 'axios';

// MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';

import {Link} from 'react-router-dom'

export default function HeaderMobile() {

    const [signInStatus,setSignInStatus] = useState(false)

    const [userName, setUserName] = useState()

    const getInforUser = async (tokenSession) => {
        const body = new FormData();
        body.append("token", tokenSession)

        const res = await axios.post('/api/user/info',body);

        if(res && res.data && res.data.status) { 
            if(res.data.status === 200) { 
                // console.log("get infor success in header:",res.data);
                setUserName(res.data?.result?.username)
                setSignInStatus(true)
            }
            else { 
                console.log(res.data.message);
            }
        }
        else { 
            alert("Error while connect to server !");
        }
    }

    useEffect(() => {
        var tokenSession = sessionStorage.getItem("token");

        getInforUser(tokenSession)

    },[sessionStorage.getItem("token")])

    // Handle Modal Nav Moible
    const [stateNav, setStateNav] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    }); 

    const modalCartNav = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawerNav(anchor, false)}
          onKeyDown={toggleDrawerNav(anchor, false)}
        >
            <div>
                <div className="cart-title">
                    <div className=" nav-logo">
                       <img src="/images/logo.png" alt="" />
                    </div>
                    <div className="cart-title-close">
                        <div className="clear-btn">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>
                    </div>
                </div>
            </div>
            
            <Divider />

            <div className="tempty-title" >
                <Link to="/dashboard" className="nav-item">
                    <div className="nav-item-name active" >
                        <i className="fa-solid fa-chart-line"></i> Dashboard
                    </div>
                </Link>
            </div>

            <div className="tempty-title" >
                <Link to="/ico" className="nav-item">
                    <div className="nav-item-name" >
                        <i className="fa-solid fa-money-bill-wave"></i>ICO
                    </div>
                </Link>
            </div>

            <div className="tempty-title" >
                <Link to="/myteam" className="nav-item">
                    <div className="nav-item-name" >
                        <i class="fa-solid fa-people-group"></i>My Team
                    </div>
                </Link>
            </div>

            <div className="tempty-title" >
                <Link to="/staking" className="nav-item">
                    <div className="nav-item-name" >
                        <i className="fa-solid fa-award"></i>Staking
                    </div>
                </Link>
            </div>

            <div className="tempty-title">
                <Link to="/shop" className="nav-item">
                    <div className="nav-item-name" >
                        <i className="fa-solid fa-cart-shopping"></i> Shop
                    </div>
                </Link>
            </div>

            <div className="tempty-title">
                <Link to="/explore" className="nav-item">
                    <div className="nav-item-name" >
                       <i className="fa-solid fa-biohazard"></i>  Explore
                    </div>
                </Link>
            </div>

            <div className="tempty-title">
                <Link to="/tournaments" className="nav-item">
                    <div className="nav-item-name" >
                        <i className="fa-solid fa-chess"></i> Tournaments
                    </div>
                </Link>
            </div>

            {
                !signInStatus
                ?
                <div className="tempty-title">
                    <Link to="/signin" className="nav-item">
                        <div className="nav-item-name" >
                            <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign in
                        </div>
                    </Link>
                </div>
                :
                <div className="tempty-title">
                    <Link to="/user" className="nav-item">
                        <div className="nav-item-name" >
                            <i className="fa-solid fa-user"></i>{userName}
                        </div>
                    </Link>
                </div>
            }

        </Box>
    );

    const toggleDrawerNav = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    
        setStateNav({ ...stateNav, [anchor]: open });
    };

    return (
        <div className="header-mobile hide-on-pc">
            {/* Modal Nav Mobile Menu*/}
            <div className="header-mobile-wrap hide-on-pc">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="header-mobile">
                                <div className="header-mobile-logo">
                                    <img className="img-height" src="/images/logo.png" alt="" />
                                </div>

                                <div className="header-mobile-icon">
                                    <i className="fa-solid fa-bars" onClick={toggleDrawerNav('left', true)}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Drawer
                anchor={'left'}
                open={stateNav['left']}
                onClose={toggleDrawerNav('left', false)}
            >
                {modalCartNav('left')}
            </Drawer>
        </div>
    )
}
