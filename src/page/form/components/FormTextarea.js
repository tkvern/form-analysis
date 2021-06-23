import React from 'react'
import PropTypes from 'prop-types'

import './FormTextarea.scss'

/**
 * 多行文本输入组件
 */
export default function FormTextarea({
  data,
  theme,
  onUpdate,
  onBlur,
  onFocus,
  onClick,
  model,
  valid,
  placeholder
}) {
  return (
    <>
      <div className={`act-form__textarea act-form__textarea-theme-${theme}`}>
        <textarea
          placeholder={placeholder || '请填写'}
          cols="30"
          rows="10"
          maxLength={data.limit || null}
          onInput={e => onUpdate(e.currentTarget.value, 'defaultValue')}
          defaultValue={model.defaultValue}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={onClick}
        ></textarea>
        {data.limit && (
          <span>
            {model.defaultValue ? model.defaultValue.length : 0}/{data.limit}
          </span>
        )}
      </div>
      {valid && data.required && !model.defaultValue && (
        <div className="act-form__valid-helper">请输入{data.tip}</div>
      )}
    </>
  )
}
FormTextarea.propTypes = {
  data: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  theme: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  valid: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired
}
