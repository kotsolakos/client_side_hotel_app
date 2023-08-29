import './navigation.styles.scss'
import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';

const Navigation = ({isSignedIn, setIsSignedIn}) => {
    if (isSignedIn){
        return(
            <Fragment>
                <nav className="navigation">
                    <Link to='/home' className='f3 link dim black underline pa3 pointer'
                    >Home</Link>
                    <Link to='/reserved' className='f3 link dim black underline pa3 pointer'
                    >Reserved Rooms</Link>
                    <Link to='/' className='f3 link dim black underline pa3 pointer'
                    onClick={() => {setIsSignedIn(false)}}>Sign Out</Link>
                </nav>
                <Outlet />
            </Fragment>
        );
    }
    else{
        return(
            <Fragment>
                <nav className="navigation">
                    <Link to='/' className='f3 link dim black underline pa3 pointer'>Sign In</Link>
                    <Link to='/signup' className='f3 link dim black underline pa3 pointer'>Sign Up</Link>
                </nav>
                <Outlet />
            </Fragment>
        );
    }
};

export default Navigation;