import React from "react";
import { Sidebar, Menu, MenuItem,SubMenu } from 'react-pro-sidebar';
import { Link, Navigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaReact } from "react-icons/fa";

const SideMenu=()=>{
    return (
        <Sidebar   style={{
            backgroundColor: '#3390ff', // Change the background color here
            height: '100vh',
          }} >
        <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            return {
              backgroundColor: active ? 'black' :'', // Change active item background color
              color: active ? '#fff' : '#black', // Change active item text color
              '&:hover': {
                backgroundColor: '#3390ff', // Change hover background color
                color: '#fff', // Change hover text color
              },
            };
          },
          subMenuContent: ({ level, active, open }) => {
            return {
              backgroundColor: open ? '#B8DAFC' : 'transparent', // SubMenu background color when open
              color: '#black', // SubMenu text color
            };
          },
        }}
      >
          <MenuItem component={<Link to="/" />} icon={<FaHome/>}> Home</MenuItem>
          <SubMenu label="CMS" icon={<FaReact />
} >
                <MenuItem component={<Link to="/aboutus" />}>AboutUs</MenuItem>
                <MenuItem component={<Link to="/contactus" />}>ContactUs</MenuItem>
                <MenuItem component={<Link to="/faq" />}>Faq</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    )
}

export default SideMenu;