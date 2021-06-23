import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import './FormUpload.scss'
import { Toast } from 'antd-mobile'

/**
 * 图片上传组件
 */
export default function FormUpload({ data, theme, onUpdate, valid, model }) {
  const fileRef = useRef(null)

  const removeItem = (index) => {
    const defaultValue = [...(model.defaultValue || [])]
    defaultValue.splice(index, 1)
    onUpdate(defaultValue, 'defaultValue')
  }

  const upload = async (e) => {
    Toast.info('e')
    const files = e.currentTarget.files

    if (!files || !files.length) return

    if (files.length + (model.defaultValue || []).length > data.maxNum) {
      Toast.info(`最多只能添加${data.maxNum}张`, 3)
      return
    }

    Toast.loading('正在上传...')
    fileRef.current.value = null
    Toast.hide()
  }

  return (
    <>
      <div className={`act-form__upload act-form__upload-theme-${theme}`}>
        {model.defaultValue &&
          model.defaultValue.map((item, index) => (
            <div className="act-form__upload-item" key={index}>
              <span>
                <img src={item} alt={`图片${index + 1}`} />
              </span>
              <i
                className="iconfont icon-shanchu"
                onClick={() => removeItem(index)}
              ></i>
            </div>
          ))}
        {// 未添加过图片 或添加图片未超过限制最多数量时才展示上传按钮
        (!model.defaultValue ||
          (model.defaultValue && model.defaultValue.length < data.maxNum)) && (
          <div className="act-form__upload-button">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => upload(e)}
              onClick={() => {}}
            />
            <i className="iconfont icon-jia"></i>
          </div>
        )}
      </div>
      {valid &&
        data.required &&
        (!model.defaultValue || !model.defaultValue.find((i) => i)) && (
          <div className="act-form__valid-helper">请选择{data.tip}</div>
        )}
    </>
  )
}
FormUpload.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired,
}
