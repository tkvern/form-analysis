import React from 'react'
import PropTypes from 'prop-types'

import './FormImage.scss'

/**
 * 图片展示组件
 */
export default function FormImage({ data }) {
  return (
    <div className="act-form__image">
      <img src={data.url} alt="" />
    </div>
  )
}
FormImage.propTypes = {
  data: PropTypes.object.isRequired,
}
