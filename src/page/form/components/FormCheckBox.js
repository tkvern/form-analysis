import React from 'react'
import PropTypes from 'prop-types'

import './FormCheckBox.scss'

/**
 * 多选组件
 */
export default function FormCheckBox({
  data,
  theme,
  onUpdate,
  model,
  valid,
  index: parentIndex
}) {
  const update = (e, index) => {
    const defaultValue = [...(model.defaultValue || [])]
    defaultValue[index] = e.currentTarget.checked

    const arr = [] // 选中的项
    for (let i = 0; i < defaultValue.length; i++) {
      if (defaultValue[i]) {
        arr.push(i)
      }
    }
    onUpdate(defaultValue, 'defaultValue', arr)
  }

  return (
    <>
      <div className={`act-form__checkbox act-form__checkbox-theme-${theme}`}>
        {data.radio.map((item, index) => (
          <label className="act-form__checkbox-item" key={index}>
            <input
              className="act-form__checkbox-model"
              type="checkbox"
              defaultValue={item.name}
              name={`act-form-checkbox-${parentIndex}`}
              defaultChecked={(model.defaultValue || [])[index]}
              onChange={e => update(e, index)}
            />
            <i className="act-form__checkbox-icon iconfont icon-icon_Cell_Selected"></i>
            <span className="act-form__checkbox-label">{item.name}</span>
          </label>
        ))}
      </div>
      {valid &&
        data.required &&
        (!model.defaultValue || !model.defaultValue.find(i => i)) && (
          <div className="act-form__valid-helper">请选择{data.tip}</div>
        )}
    </>
  )
}
FormCheckBox.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  theme: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired
}
