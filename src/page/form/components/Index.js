import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'antd-mobile'
import { getForm, validSMSCode, submitForm } from 'api/form'

import './Index.scss'

import Header from './Header'
import FormTitle from './FormTitle'
import FormInput from './FormInput'
import FormTextarea from './FormTextarea'
import FormDateTimeInput from './FormDateTimeInput'
import FormRadioBox from './FormRadioBox'
import FormCheckBox from './FormCheckBox'
import FormSelect from './FormSelect'
import FormUpload from './FormUpload'
import FormText from './FormText'
import FormImage from './FormImage'
import FormMap from './FormMap'
import FormSplitLine from './FormSplitLine'
import { idCardValid } from '../../../utils/judge'

const pad = (n) => (n < 10 ? `0${n}` : n)
const formatTime = (date) => {
  if (!date) return null
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const formatDate = (date) => {
  if (!date) return null
  return `${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(
    date.getDate()
  )}`
}

/**
 * 表单引擎入口组件
 */
export default function Index({
  type = 'page', // ['page', 'dialog'] 作为页面弹窗还是独立页面
  id,
  submit: readonly,
  platform,
  onReady,
  onSubmitted,
}) {
  const [formModel, setFormModel] = useState(null) // 该表单的设置，内含所有组件的描述
  const [guidObj, setGuidObj] = useState({}) // 关联映射
  const [formData, setFormData] = useState([]) // 已填的数据
  const [valid, setValid] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      let data = await getForm({ formId: id }, { showLoading: true })

      data.theme = +data.theme || 0

      let formData = data.context.map(() => ({
        defaultValue: null,
      }))

      // 如果有缓存上一次填写的值
      const oldFormData = localStorage.getItem(`formData-${id}`)
      // 如果有缓存组件显示隐藏，则缓存的显示隐藏
      const oldFormGuid = localStorage.getItem(`formGuid-${id}`)
      // 是否用了缓存组件显示隐藏
      let isUseLastShowFlag = false
      if (oldFormData && oldFormGuid) {
        // 有可能会在这个页面填写了部分内容，然后跳转到别的页面再跳回来，所以需要保存和重新设置之前填写过的内容
        const temp = JSON.parse(oldFormData)
        const tempGuidObj = JSON.parse(oldFormGuid)
        if (temp.length === formData.length) {
          // 一定要进行这个判断，因为如果表单改了，缓存的数据肯定要清空了
          formData = temp
          isUseLastShowFlag = true
          data.context.forEach((d, i) => {
            switch (d.type) {
              // 日期和时间，因为转为json时会变成字符串，所以要转回来
              case 4:
              case 5: {
                if (
                  formData[i] &&
                  typeof formData[i].defaultValue === 'string'
                ) {
                  formData[i].defaultValue = new Date(formData[i].defaultValue)
                }
                break
              }
              default: {
                break
              }
            }
            d.hide = tempGuidObj[d.guid]
          })
        }
      }

      // 如果没有用缓存的显示隐藏，则重新判断显示隐藏
      if (!isUseLastShowFlag) {
        data = setRelation(data)
      }

      // 设置关联组件关系，每个组件有 relationIdArr字段，存入formData
      const obj = {}
      const obj1 = {}
      for (let i = 0; i < data.context.length; i++) {
        const item = data.context[i]
        obj1[item.guid] = i
        if (item.relationId && item.relationChecks && item.relationFlag) {
          obj[item.guid] = item.relationId
        }
      }

      const obj2 = {}
      Object.keys(obj).map((key) => {
        let arr = []
        let value = obj[key]
        while (value) {
          arr.push(value)
          value = obj[value]
        }

        obj2[key] = arr
        return arr
      })

      for (let j = 0; j < data.context.length; j++) {
        const item = data.context[j]
        item.relationIdArr = obj2[item.guid] || []
      }
      // guid 对应的 index, 方便查找guid对应的组件
      setGuidObj(obj1)

      setFormData(formData)
      setFormModel(data)

      if (onReady) onReady(data)
    }
    fetchData()
    // eslint-disable-next-line
  }, [id, onReady])

  // 一开始设置关联组件显示隐藏
  function setRelation(data) {
    data.context.forEach((d) => {
      if (d.relationFlag) {
        d.hide = true
      } else {
        d.hide = false
      }
    })
    return data
  }

  // a和b都是数组，返回a和b 交集的个数是否大于0
  function isIntersection(a, b) {
    const intersection = a.filter((ele) => b.includes(ele))
    return intersection.length
  }

  // 点击了组件A（下拉框，多项选择，单项选择）后，设置关联组件显示隐藏
  // checkedValue是数组，代表组件A选中的项，item 代表组件A，i是组件A的位置
  // 点击后，设置A 组件的checkedValue
  // 然后循环整个列表，如果发现有关联组件A的组件（判断条件是 relationIdArr，里面有关联组件A的所有组件）才继续判断，

  // relationIdArr 里面第一个项是直接关联组件
  // relationIdArr 里面第一个是组件A的guid，说明它是直接关联组件A的，根据isIntersection方法直接判断
  // relationIdArr 里面第一个不是组件A的guid，说明它是间接关联组件A的，
  // 那么先判断relationIdArr里面的所有关联组件是否有隐藏的，如果有一个隐藏，当前组件一定是隐藏的
  // 再判断relationIdArr第一个关联组件和当前组件，通过isIntersection方法

  // guidShowObj是设置组件显示隐藏的缓存，下次进来用缓存来显示隐藏
  function setRelationShowHide(checkedValue, item, i) {
    formModel.context[i].checkedValue = checkedValue || []
    setFormModel(formModel)
    const guidShowObj = {}
    for (let j = 0; j < formModel.context.length; j++) {
      const element = formModel.context[j]
      const { guid, relationIdArr, relationChecks } = element

      if (!relationIdArr.includes(item.guid)) {
        guidShowObj[guid] = element.hide
        continue
      }

      if (relationIdArr[0] === item.guid) {
        const isShow = isIntersection(checkedValue, relationChecks)
        element.hide = !isShow
      } else {
        // 先判断关联数组中是否有隐藏的，如果有隐藏，当前组件一定是隐藏的
        const hide = relationIdArr.some((gid) => {
          const ele = formModel.context[guidObj[gid]]
          return ele.hide
        })
        if (hide) {
          element.hide = hide
        } else {
          const relationItem = formModel.context[guidObj[relationIdArr[0]]]
          const isShow = isIntersection(
            relationItem.checkedValue || [],
            relationChecks
          )
          element.hide = !isShow
        }
      }

      guidShowObj[guid] = element.hide
    }

    // 这里设置缓存，是为了下一次进来判断显示隐藏
    localStorage.setItem(`formGuid-${id}`, JSON.stringify(guidShowObj))

    setFormModel(formModel)
  }

  const setValue = (value, index, key) => {
    key = key || 'defaultValue'
    const newFormData = [...formData]
    newFormData[index][key] = value
    setFormData(newFormData)
    localStorage.setItem(`formData-${id}`, JSON.stringify(newFormData))
  }

  const submit = async () => {
    if (platform === 'bm') return
    if (+readonly === 1) {
      Toast.info('当前表单为只读模式')
      return
    }

    setValid(true)
    const values = []
    for (let i = 0; i < formModel.context.length; i++) {
      const item = formModel.context[i]
      const { defaultValue, code, address, lng, lat } = formData[i]

      values.push({})

      // 这里再次做校验
      // ps. 其实本应该在组件里校验，这里直接取校验结果的
      if (!item.hide) {
        switch (item.type) {
          case 2:
            // 普通文本
            if (item.required && !defaultValue) {
              return Toast.info(`${item.tip}为必填项`)
            }
            // 数字类型
            if (
              item.validType === 2 &&
              item.required &&
              defaultValue &&
              !/^\d{11}$/.test(defaultValue)
            ) {
              return Toast.info(`请输入正确的${item.tip}`)
            }
            // 需要验证短信
            if (
              item.validType === 2 &&
              item.required &&
              item.verifyPhone === 1
            ) {
              if (!code) return Toast.info(`请输入${item.tip}验证码`)
              const valid = await validSMSCode({
                phoneNum: defaultValue,
                smsCode: code,
              })
              if (!valid) return Toast.info(`请输入正确的${item.tip}验证码`)
            }
            // 邮箱类型
            if (
              item.validType === 3 &&
              defaultValue &&
              !/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(
                defaultValue
              )
            ) {
              return Toast.info(`请输入正确的${item.tip}`)
            }
            // 身份证
            if (
              item.validType === 4 &&
              defaultValue &&
              !idCardValid(defaultValue)
            ) {
              return Toast.info(`请输入正确的${item.tip}`)
            }
            values[i].value = defaultValue
            if (item.validType === 2 && item.verifyPhone === 1 && code) {
              values[i].code = code
            }
            break
          case 3:
          case 7:
          case 9:
            if (item.required && !defaultValue) {
              return Toast.info(`${item.tip}为必填项`)
            }
            values[i].value = defaultValue
            break
          case 4:
            if (item.required && !defaultValue) {
              return Toast.info(`${item.tip}为必填项`)
            }
            values[i].value = formatTime(defaultValue)
            break
          case 5:
            if (item.required && !defaultValue) {
              return Toast.info(`${item.tip}为必填项`)
            }
            values[i].value = formatDate(defaultValue)
            break
          case 6:
            if (
              item.required &&
              (!defaultValue || defaultValue.findIndex((i) => !i) !== -1)
            )
              return Toast.info(`${item.tip}为必填项`)
            values[i].value = defaultValue
            break
          case 8:
            if (
              item.required &&
              (!defaultValue || !defaultValue.find((i) => i))
            )
              return Toast.info(`${item.tip}为必填项`)
            values[i].value = (defaultValue || [])
              .map((v, i) => (v ? item.radio[i].name : null))
              .filter((i) => i)
              .join(';')
            break
          case 10:
            if (item.required && !defaultValue)
              return Toast.info(`${item.tip}为必填项`)
            if (defaultValue) values[i].value = defaultValue
            break
          case 11:
            if (item.required && !defaultValue)
              return Toast.info(`${item.tip}为必填项`)
            if (item.required && item.type_a === 1 && !address)
              return Toast.info(`${item.tip}详情为必填项`)
            if (defaultValue)
              values[i].value = defaultValue.map((item) => item.value).join(' ')
            if (defaultValue && address)
              values[i].value = `${values[i].value} ${address}`
            if (lng || lat) {
              values[i].lng = lng
              values[i].lat = lat
            }
            break
          default:
            break
        }
      }
    }

    const context = values.map((item, i) => {
      return {
        ...item,
        ...formModel.context[i],
      }
    })

    const newFormData = {
      formId: id,
      context: JSON.stringify(context),
    }

    const res = await submitForm(newFormData, {
      showLoading: true,
      responseType: 'body',
    })
    const sumbitId = 'abc'
    const content = []
    context.forEach(({ value, tip, type }) => {
      if (value === null || value === undefined) return
      content.push({
        type,
        key: tip,
        value: type === 10 ? JSON.stringify(value) : value,
      })
    })

    // 提交成功后，移除缓存
    if (res) {
      localStorage.removeItem(`formData-${id}`)
    }

    // 内部链接
    Toast.success('提交成功', 1)
    onSubmitted(sumbitId)
  }

  if (!formModel) return null

  return (
    <div
      className={`act-form act-form-theme-${formModel.theme} act-form-type-${type}`}
    >
      {formModel.cover && <Header data={formModel} />}
      <div className={`act-form__wrap act-form__wrap-theme-${formModel.theme}`}>
        <div
          className={`act-form__item act-form__item-theme-${formModel.theme}`}
        >
          {formModel.context.map(
            (item, index) =>
              !item.hide && (
                <React.Fragment key={index}>
                  {/* 组件的label */}
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].includes(item.type) && (
                    <div
                      className={`act-form__item-header act-form__item-header-type-${item.type}`}
                    >
                      {item.required && (
                        <span className="act-form__item-required">*</span>
                      )}
                      <span className="act-form__item-label">{item.tip}</span>
                      {item.type === 10 && (
                        <span className="act-form__item-helper">
                          最多{item.maxNum}张
                        </span>
                      )}
                    </div>
                  )}

                  {/* 标题组件 */}
                  {item.type === 1 && (
                    <FormTitle data={item} theme={formModel.theme} />
                  )}

                  {/* 输入框组件 */}
                  {item.type === 2 && (
                    <FormInput
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      valid={valid}
                    />
                  )}

                  {/* 多行输入框组件 */}
                  {item.type === 3 && (
                    <FormTextarea
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      valid={valid}
                    />
                  )}

                  {/* 时间输入组件 */}
                  {item.type === 4 && (
                    <FormDateTimeInput
                      type="time"
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      valid={valid}
                    />
                  )}

                  {/* 日期输入组件 */}
                  {item.type === 5 && (
                    <FormDateTimeInput
                      type="date"
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      valid={valid}
                    />
                  )}

                  {/* 单选组件 */}
                  {item.type === 7 && (
                    <FormRadioBox
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key, checkedValue) => {
                        setRelationShowHide(checkedValue, item, index)
                        setValue(value, index, key, item)
                      }}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}

                  {/* 多选组件 */}
                  {item.type === 8 && (
                    <FormCheckBox
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key, checkedValue) => {
                        setRelationShowHide(checkedValue, item, index)
                        setValue(value, index, key)
                      }}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}

                  {/* 下拉选择组件 */}
                  {item.type === 9 && (
                    <FormSelect
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key, checkedValue) => {
                        setRelationShowHide(checkedValue, item, index)
                        setValue(value, index, key, item)
                      }}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}

                  {/* 文件上传组件 */}
                  {item.type === 10 && (
                    <FormUpload
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}

                  {/* 文本显示组件 */}
                  {item.type === 12 && (
                    <FormText
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}
                  {item.type === 13 && (
                    <FormImage
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}

                  {/* 图片显示组件 */}
                  {item.type === 14 && (
                    <FormMap
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}

                  {/* 占位符组件 */}
                  {item.type === 15 && (
                    <FormSplitLine
                      data={item}
                      theme={formModel.theme}
                      onUpdate={(value, key) => setValue(value, index, key)}
                      model={formData[index]}
                      index={index}
                      valid={valid}
                    />
                  )}
                </React.Fragment>
              )
          )}
        </div>
      </div>
      {/* 兼容设计器和展示端显示 */}
      {platform !== 'bm' && (
        <div
          className={`act-form__submit act-form__submit-theme-${formModel.theme}`}
        >
          <button type="button" onClick={() => submit()}>
            {formModel.buttonText}
          </button>
        </div>
      )}
    </div>
  )
}

Index.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  submit: PropTypes.string,
  platform: PropTypes.string,
  title: PropTypes.string,
  onReady: PropTypes.func,
  onSubmitted: PropTypes.func.isRequired,
}
