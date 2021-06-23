import React from 'react'
import PropTypes from 'prop-types'

import './FormTitle.scss'

/**
 * 标题显示组件
 */
export default function FormTitle({ data, theme }) {
  return (
    <div className={`act-form__title act-form__title-theme-${theme}`}>
      {data.tip}
    </div>
  )
}

FormTitle.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.number.isRequired,
}
