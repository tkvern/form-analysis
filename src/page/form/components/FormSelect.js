import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Picker } from 'antd-mobile'

import './FormSelect.scss'

/**
 * 下拉选择组件
 */
export default function FormSelect({ data, theme, onUpdate, valid, model }) {
  const [isPickerOpen, togglePicker] = useState(false)
  const options = data.radio.map((item, index) => ({
    label: item.name,
    value: item.name
  }))

  const [value, setValue] = useState([])

  // 更新选项
  const update = value => {
    setValue([value])
    let k = -1
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        k = i
        break
      }
    }
    onUpdate(value, 'defaultValue', [k])
  }

  // 清除选项
  const clear = e => {
    e.preventDefault()
    e.stopPropagation()
    setValue([])
    onUpdate('', 'defaultValue', [])
  }

  useEffect(() => {
    setValue(model.defaultValue ? [model.defaultValue] : [])
  }, [model.defaultValue])

  return (
    <>
      <Picker
        data={options}
        cols={1}
        value={value}
        onChange={value => update(value[0])}
        onVisibleChange={e => togglePicker(e)}
      >
        <div
          className={`act-form__select act-form__select-theme-${theme} ${
            isPickerOpen ? 'active' : ''
          }`}
        >
          {model.defaultValue ? (
            <span className="act-form__select-value">{model.defaultValue}</span>
          ) : (
            <span className="act-form__select-placeholder">请选择</span>
          )}
          {value && value.length > 0 ? (
            <i
              className="act-form__select-close iconfont icon-icon_close_soild"
              onClick={clear}
            ></i>
          ) : (
            <i className="act-form__select-arrow iconfont icon-gerenziliaojiantou"></i>
          )}
        </div>
      </Picker>
      {valid && data.required && !model.defaultValue && (
        <div className="act-form__valid-helper">请选择{data.tip}</div>
      )}
    </>
  )
}
FormSelect.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired
}
