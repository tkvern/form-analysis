import React from 'react'
import PropTypes from 'prop-types'

import './FormRadioBox.scss'

/**
 * 单选组件
 */
export default function FormRadioBox({
  data,
  theme,
  onUpdate,
  model,
  valid,
  index: parentIndex
}) {
  return (
    <>
      <div className={`act-form__radio act-form__radio-theme-${theme}`}>
        {data.radio.map((item, index) => (
          <label className="act-form__radio-item" key={index}>
            <input
              className="act-form__radio-model"
              type="radio"
              defaultValue={item.name}
              name={`act-form-radio-${parentIndex}`}
              defaultChecked={model.defaultValue === item.name}
              onChange={() => onUpdate(item.name, 'defaultValue', [index])}
            />
            <i
              className={`
                act-form__radio-icon
                ${theme === 6 ? 'iconfont icon-icon_Cell_Selected' : ''}
              `}
            ></i>
            <span className="act-form__radio-label">{item.name}</span>
          </label>
        ))}
      </div>
      {valid && data.required && !model.defaultValue && (
        <div className="act-form__valid-helper">请选择{data.tip}</div>
      )}
    </>
  )
}
FormRadioBox.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  theme: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired
}
