import React, { Component } from 'react'
import { connect } from 'react-redux';
import '../SeatSelection/css/style.css'
import FormInfo from './FormInfo';
import SeatStructure from './SeatStructure';
import TableInfo from './TableInfo';

class SeatSelection extends Component {

    render() {
        return (
            <div className="container-fluid pageContainer">
                <h3 className='title'>MOVIE SEAT SELECTION</h3>
                <div className='pageContent'>
                    <FormInfo />
                    <ul className='colorSample'>
                        <li className='greenBox'>Selected Seat</li>
                        <li className='redBox'>Reserved Seat</li>
                        <li className='emptyBox'>Empty Seat</li>
                    </ul>
                    <p id="notification" style={{textAlign: 'center'}}><b style={{marginBottom: 0, background: '#ff9800', letterSpacing: 1}}>{this.props.message}</b></p>
                    <SeatStructure />
                    <TableInfo />
                </div>
                <div className='footer'>© 2018 Movie Seat Selection . All Rights Reserved | Design by W3layouts</div>
            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        message : rootReducer.datVeReducer.message,
    }
}

export default connect(mapStateToProps)(SeatSelection)
