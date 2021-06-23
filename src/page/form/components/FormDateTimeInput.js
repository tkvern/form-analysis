import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DatePicker } from 'antd-mobile'

import './FormDateTimeInput.scss'

/**
 * 日期时间选择组件
 */
export default function FormDateTimeInput({
  type,
  data,
  theme,
  onUpdate,
  valid,
  model
}) {
  const [isPickerOpen, togglePicker] = useState(false)
  const [minDate, setMinDate] = useState(null)
  const [maxDate, setMaxDate] = useState(null)

  const pad = n => (n < 10 ? `0${n}` : n)
  const format = date => {
    if (type === 'time') {
      if (!date) return 'HH:ss'
      return `${pad(date.getHours())}:${pad(date.getMinutes())}`
    }
    if (type === 'date') {
      if (!date) return 'yyyy-MM-dd'
      return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(
        date.getDate()
      )}`
    }
  }

  useEffect(() => {
    const minDate = new Date()
    const maxDate = new Date()
    minDate.setFullYear(minDate.getFullYear() - 80)
    maxDate.setFullYear(maxDate.getFullYear() + 40)
    minDate.setHours(0, 0, 0, 0)
    maxDate.setHours(23, 59, 59, 999)
    setMinDate(minDate)
    setMaxDate(maxDate)
  }, [])

  return (
    <>
      <DatePicker
        mode={type}
        minuteStep={2}
        minDate={minDate}
        maxDate={maxDate}
        value={model.defaultValue}
        onChange={value => onUpdate(value, 'defaultValue')}
        onVisibleChange={e => togglePicker(e)}
      >
        <div
          className={`act-form__time act-form__time-theme-${theme} ${
            isPickerOpen ? 'active' : ''
          }`}
        >
          {model.defaultValue ? (
            <span className="act-form__time-value">
              {format(model.defaultValue)}
            </span>
          ) : (
            <span className="act-form__time-placeholder">
              请选择{type === 'time' ? '时间' : '日期'}
            </span>
          )}
          <i className="act-form__time-arrow iconfont icon-gerenziliaojiantou"></i>
        </div>
      </DatePicker>
      {valid && data.required && !model.defaultValue && (
        <div className="act-form__valid-helper">请选择{data.tip}</div>
      )}
    </>
  )
}
FormDateTimeInput.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  theme: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired
}
