/* eslint-disable no-loop-func */
import React, { Component } from 'react'
import { connect } from 'react-redux';

class SeatStructure extends Component {
    seats = [];
    renderSeat = () => {
        let mangSeat = [];
        let mangSeatHang = [];
        let columnNumber = 0;
        let rowNumber = 0;
        for (let index = 64; index < 76; index++) {
            mangSeatHang = []
            for (let i = 0; i < 14; i++) {
                columnNumber = i < 6 ? i : i === 6 ? -1 : i - 1
                rowNumber = index < 70 ? index : index === 70 ? -1 : index - 1
                
                if (rowNumber === 64 && columnNumber === 0) { // 0 0
                    mangSeatHang.push(<td key={`${i}${index}`}></td>)
                }
                else if (columnNumber === -1) { //cot k cho ngoi
                    mangSeatHang.push(<td key={`${i}${index}`} className='noSeatCol'></td>);
                }
                else if (rowNumber === -1) { //hang k cho ngoi
                    mangSeatHang.push(<td key={`${i}${index}`}></td>);
                }
                else if (rowNumber === 64) { // hang dau
                    mangSeatHang.push(<td key={`${i}${index}`}>{columnNumber}</td>)
                }
                else if (columnNumber === 0) { // cot dau
                    mangSeatHang.push(<td key={`${i}${index}`}>{String.fromCharCode(rowNumber)}</td>)
                }
                else { //phan tu khac
                    const seat = this.props.reservedSeats.find((reserveSeat) => {
                        return reserveSeat === `${String.fromCharCode(rowNumber)}${columnNumber}`
                    });     
                    if (seat) {
                        mangSeatHang.push(<td key={`${i}${index}`}>
                            <input className='reserveSeat' disabled='disabled' type="checkbox" value={String.fromCharCode(rowNumber) + columnNumber} />
                        </td>)
                    }
                    else{
                        let kq = this.seats.find((seat) => {
                            return seat === String.fromCharCode(rowNumber) + columnNumber;
                        })
                        mangSeatHang.push(<td key={`${i}${index}`}>
                        <input onClick={(event) => {      
                            if(event.target.checked){
                                this.seats.push(event.target.value)  
                            }
                            else{
                                this.seats = this.seats.filter((ele) => {
                                    return ele !== event.target.value
                                })
                            }
                            let action = {
                                type: 'SELECTING',
                                mangSeats: this.seats
                            }
                            this.props.dispatch(action)             
                        }} disabled={this.props.selectStarting? '' : kq? '' : 'disabled'} type="checkbox" value={String.fromCharCode(rowNumber) + columnNumber} />
                    </td>)
                    }
                }
            }
            mangSeat.push(<tr key={index}>{mangSeatHang}</tr>);
        }
        return mangSeat;
    }

    render() {
        return (
            <div className='seatStructure'>
                <table className='blockSeat'>
                    <tbody>
                        {this.renderSeat()}
                    </tbody>
                </table>
                <div className='screen'>SCREEN THIS WAY</div>
                <button disabled={this.props.enableConfirm? '' : 'disabled'} onClick={() => {
                    let action = {
                        type: "CONFIRMATION",
                        confirmation: true
                    }
                    this.props.dispatch(action)
                }} className='confirmButton'>Confirm Selection</button>
            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        selectStarting: rootReducer.datVeReducer.startSelect,
        reservedSeats: rootReducer.datVeReducer.reservedSeats,
        enableConfirm: rootReducer.datVeReducer.enableConfirm,
    }
}

export default connect(mapStateToProps)(SeatStructure);