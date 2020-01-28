import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header" >
               <h1 className="title">Matching-recordings app <i className="fas fa-music"></i></h1>
               <hr/>
            </div>
        );
    }
}
export default Header