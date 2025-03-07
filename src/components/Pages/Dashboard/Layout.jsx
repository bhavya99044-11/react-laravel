import React from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout=()=>{
    return (
        <div style={{
            display: 'flex',
            height: '100vh',
        
        }} >
                <div >
        <Sidebar />
        </div>
        <div>
          {/* <Header /> */}
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    )
}

export default Layout;