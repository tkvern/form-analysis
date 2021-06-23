import React from 'react'
import PropTypes from 'prop-types'

import './Header.scss'

/**
 * 头图组件
 */
export default function Header({ data }) {
  return (
    <div
      className={`act-form__header act-form__header-theme-${data.theme || 0}`}
    >
      <img className="act-form__header-cover" src={data.cover} alt="表单封面" />
      <div
        className={`act-form__header-title act-form__header-title-theme-${data.theme ||
          0}`}
      >
        {+data.showTitle !== 0 && <span>{data.name || ''}</span>}
      </div>
    </div>
  )
}

Header.propTypes = {
  data: PropTypes.object.isRequired
}
