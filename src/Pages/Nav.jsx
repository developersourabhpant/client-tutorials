import React from 'react';
import { Link, } from 'react-router-dom';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import "./Nav.css"
import {
    FaTh,
    FaUserAlt,
    FaAsymmetrik,
    FaCreativeCommonsBy,
    FaAccessibleIcon,
    FaExpeditedssl,
    FaBusinessTime,


} from "react-icons/fa";

import { FiLink } from "react-icons/fi";
import { RxDropdownMenu } from "react-icons/rx"



const Nav = () => {

    const menuItem = [
        {
            path: "/lead-add",
            name: "Lead Add",
            icon: <FaTh />

        },
        // // dropdown
        {
            path: "/lead-information",
            name: "Lead Information",
            icon: <FaUserAlt />,

        },
        {
            path: "/dashboard",
            name: "Course Add",
            icon: <FaAsymmetrik />

        },
        {
            path: "/lead-table",
            name: "Course Table",
            icon: <FaCreativeCommonsBy />

        }, {
            path: "/lead-stage",
            name: "Stage Add",
            icon: <FaAccessibleIcon />
        }

    ]

    return (
        <div className="continer">
            <div className="sidebar bg-dark">
                <div className="top-section">
                    <h1 className='logo'> <FaBusinessTime className='mx-1' />Management</h1>
                </div>
                {/* dropdowm */}
                {/* <div className="dropdown">
                    <a to="/lead-information" className="dropdown-card nav-link  dropdown-toggle" href="/lead-information" data-bs-toggle="dropdown" aria-expanded="false"><FaUserAlt className='dropdown-icon mx-3 ' />
                        Lead Information
                    </a>
                    <ul class="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div> */}
                {
                    menuItem.map((item, index) => (
                        <Link to={item.path} key={index} className='link nav-link'  >
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </Link>
                    ))
                }
                <Link to="/" onClick={() => localStorage.clear()} className="nav-link logout py-2"><FaExpeditedssl className='mx-3 ' />Logout</Link>
                <Link to="/term-condition" className='term-link text-white nav-link py-2'><FiLink className='mx-3' />Term&Condition</Link>


            </div>

        </div>

    )
}
export default Nav;

