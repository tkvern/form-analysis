import React from 'react'
import PropTypes from 'prop-types'

import './FormSplitLine.scss'

/**
 * 占位符组件
 */
export default function FormSplitLine({ data }) {
  if (data.display !== 'show') return null

  return (
    <div
      className={`act-form__line act-form__line-type-${data.pos}`}
      style={{ height: `${data.height}px` }}
    ></div>
  )
}
FormSplitLine.propTypes = {
  data: PropTypes.object.isRequired,
}
