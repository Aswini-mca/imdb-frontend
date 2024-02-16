import React from 'react'

function Footer() {
    let date = new Date();
    return (
        <div className='container-fluid bg-dark text-light text-center p-3'>
            <p>© 1990-{date.getFullYear()} by IMDb.com, Inc.</p>
        </div>
    )
}

export default Footer