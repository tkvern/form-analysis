import React from 'react'
import PropTypes from 'prop-types'

import './FormText.scss'

/**
 * 文本展示组件
 */
export default function FormText({ data, theme }) {
  return (
    <div className={`act-form__text act-form__text-theme-${theme}`}>
      {data.tip}
    </div>
  )
}
FormText.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.number.isRequired,
}
