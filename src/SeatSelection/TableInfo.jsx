import React, { Component } from 'react'
import { connect } from 'react-redux'

class TableInfo extends Component {
    render() {
        return (
            <div className='tableInfo'>
                <table className="tableDisplay">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number of Seats</th>
                            <th>Seats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.confirmation? this.props.user.name : ''}</td>
                            <td>{this.props.confirmation? this.props.user.numberOfSeat : ''}</td>
                            <td>
                                {this.props.confirmation? this.props.user.seats.toString() : ''}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

const mapStateToProps = (rootReducer) => {
    return {
        user: rootReducer.datVeReducer.user,
        confirmation: rootReducer.datVeReducer.confirmation
    }
}

export default connect(mapStateToProps)(TableInfo)
