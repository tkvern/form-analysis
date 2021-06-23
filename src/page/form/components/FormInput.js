import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Toast } from 'antd-mobile'

import { sendSMS } from 'api/form'
import { idCardValid } from 'utils/judge'

import './FormInput.scss'

/**
 * 输入框组件
 */
export default function FormInput({ data, theme, onUpdate, valid, model }) {
  const [isAlreadySend, setIsAlreadySend] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [canSend, setCanSend] = useState(true)
  const [countdown, setCountdown] = useState(null)
  const [countdownTimer, setCountdownTimer] = useState(null)
  useEffect(() => () => clearTimeout(countdownTimer), [countdownTimer])

  const runCountdown = value => {
    if (value <= 0) {
      setCanSend(true)
      return
    }

    setCountdown(value)
    const timer = setTimeout(() => {
      const countdown = value - 1
      runCountdown(countdown)
    }, 1000)
    setCountdownTimer(timer)
  }

  const getSMS = async () => {
    const { defaultValue } = model
    if (!defaultValue) return Toast.info('请输入手机号码')
    if (!/^\d{11}$/.test(defaultValue))
      return Toast.info('请输入正确的手机号码')
    setIsSending(true)
    setCanSend(false)
    try {
      await sendSMS({ phoneNum: defaultValue })
      setIsSending(false)
      if (!isAlreadySend) setIsAlreadySend(true)
      runCountdown(60)
    } catch (e) {
      Toast.info('发送失败')
      setIsSending(false)
      setCanSend(true)
    }
  }

  return (
    <div className={`act-form__input act-form__input-theme-${theme}`}>
      <input
        className="act-form__input-model"
        maxLength={data.validType === 2 ? 11 : null}
        type={data.validType === 2 ? 'number' : 'text'}
        placeholder={`请输入${data.tip}`}
        defaultValue={model.defaultValue}
        onInput={e => onUpdate(e.currentTarget.value, 'defaultValue')}
      />
      {valid && data.required && !model.defaultValue && (
        <div className="act-form__valid-helper">请输入{data.tip}</div>
      )}
      {valid &&
        data.validType === 2 &&
        model.defaultValue &&
        !/^\d{11}$/.test(model.defaultValue) && (
          <div className="act-form__valid-helper">请输入正确的{data.tip}</div>
        )}
      {valid &&
        data.validType === 3 &&
        model.defaultValue &&
        !/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(
          model.defaultValue
        ) && (
          <div className="act-form__valid-helper">请输入正确的{data.tip}</div>
        )}
      {// 身份证校验
      valid &&
        data.validType === 4 &&
        model.defaultValue &&
        !idCardValid(model.defaultValue) && (
          <div className="act-form__valid-helper">请输入正确的{data.tip}</div>
        )}
      {data.validType === 2 && data.verifyPhone === 1 && (
        <>
          <div className="act-form__input-verify">
            <input
              className="act-form__input-verify-model"
              maxLength={6}
              type="number"
              placeholder="请输入验证码"
              defaultValue={model.code}
              onInput={e => onUpdate(e.currentTarget.value, 'code')}
            />
            {canSend ? (
              <button
                className="act-form__input-verify-button"
                onClick={() => getSMS()}
                type="button"
              >
                {isAlreadySend ? '重新发送' : '获取验证码'}
              </button>
            ) : (
              <span className="act-form__input-verify-helper">
                {isSending ? '发送中...' : `${countdown}s`}
              </span>
            )}
          </div>
          {valid && data.required && !model.code && (
            <div className="act-form__valid-helper">请输入验证码</div>
          )}
          {valid && model.code && !/^\d{6}$/.test(model.code) && (
            <div className="act-form__valid-helper">请输入正确的验证码</div>
          )}
        </>
      )}
    </div>
  )
}

FormInput.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  model: PropTypes.object.isRequired
}
