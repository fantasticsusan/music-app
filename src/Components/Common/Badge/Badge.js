import React from 'react'
import PropTypes from 'prop-types'

const Badge = ({children}) => (
    <span className="tag">{children}</span>
)

Badge.propTypes = {
    children: PropTypes.any.isRequired
}

export default Badge
