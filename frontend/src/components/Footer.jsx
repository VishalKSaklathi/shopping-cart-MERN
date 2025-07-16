import React from 'react';

function Footer() {
    return (
        <div
            style={{
                width: '100%',
                textAlign: 'center',
                padding: '25px',
                marginTop: '10px',
                color: '#f4f4f4',
                backgroundColor: '#34495e',
                fontSize: '16px',
                fontFamily: 'Segoe UI, sans-serif',
            }}
        >
            © {new Date().getFullYear()} Ultimez Technology — All rights reserved.
            <hr />
            Developed By Vishal
        </div>
    );
}

export default Footer;
