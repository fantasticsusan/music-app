import React from 'react'
import PropTypes from 'prop-types'

class InputSearch extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.props.setSearchText(e.target.value)
    }

    render() {

        const {searchText} = this.props
        return (
            <div className="search-input">
                <div className="field">
                    <p className="control has-icons-left">
                        <input
                            className="input"
                            type="text"
                            value={searchText}
                            onChange={this.handleChange}
                            placeholder="Search by title, artist, ISRC or duration"
                        />
                        <span className="icon is-small is-left">
                                      <i className="fas fa-search"/>
                                    </span>
                    </p>
                </div>
            </div>
        )
    }
}
InputSearch.propTypes = {
    searchText: PropTypes.string.isRequired,
    setSearchText: PropTypes.func.isRequired,
}
export default InputSearch
