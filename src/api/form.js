const defaultFormData = {
  name: '这是个表单',
  description: '这个表单通过表单设计器生成表单数据，表单解析器进行解析',
  showTitle: 1,
  cover: 'https://dev-ftecard.aijiatui.com/files/2021/0623/17a36ad4375.jpeg',
  theme: 0,
  context: [
    {
      type: 1,
      tip: '标题',
      unabled: true,
      guid: '4a68aca0-0e75-4ee6-9cdd-c2185fc43f50',
      name: '标题',
      relationChecks: [],
      relationFlag: false,
    },
    {
      type: 2,
      tip: '手机号',
      limit: 11,
      verifyPhone: 2,
      validType: 2,
      required: true,
      guid: '3d139a41-fd0c-4d2b-95e1-adf4b606daef',
      name: '单行文本',
      relationChecks: [],
      relationFlag: false,
    },
    {
      type: 2,
      tip: '姓名',
      limit: 11,
      verifyPhone: 2,
      validType: 1,
      required: true,
      guid: 'b6a86e0f-1309-4d03-826f-f2bb4c3f6c8a',
      name: '单行文本',
      relationChecks: [],
      relationFlag: false,
    },
    {
      type: 2,
      tip: '邮箱',
      limit: 15,
      verifyPhone: 2,
      validType: 3,
      required: true,
      guid: '86829391-e19b-4b35-a39d-2f5cb17f300e',
      name: '单行文本',
      relationChecks: [],
      relationFlag: false,
    },
    {
      type: 2,
      tip: '自定义文本',
      limit: 15,
      verifyPhone: 2,
      validType: 0,
      required: true,
      guid: '3f2a4f4c-687b-440e-827e-e1362c79a62a',
      name: '单行文本',
      relationChecks: [],
      relationFlag: false,
    },
    {
      type: 3,
      tip: '多行文本',
      limit: 300,
      required: true,
      guid: 'f73123ff-80ca-4d07-a4b8-3a438648ebfc',
      name: '多行文本',
      relationChecks: [],
      relationFlag: false,
    },
    {
      name: '时间',
      type: 4,
      tip: '时间',
      required: true,
      guid: '907d3926-5a1d-4186-af3d-3b8dd72f9476',
      relationChecks: [],
      relationFlag: false,
    },
    {
      tip: '日期',
      name: '日期',
      type: 5,
      required: true,
      guid: '791098c7-f889-4d07-88be-0486e84c0831',
      relationChecks: [],
      relationFlag: false,
    },
    {
      tip: '下拉框',
      radio: [
        {
          id: '',
          name: '选项一',
        },
        {
          id: '',
          name: '选项二',
        },
      ],
      required: true,
      name: '下拉框',
      active: '1',
      guid: '4e060c95-f9e5-47fc-8462-132473893d4f',
      type: 9,
      relationChecks: [],
      relationFlag: false,
    },
    {
      name: '单项选择',
      type: 7,
      active: 1,
      tip: '性别',
      radio: [
        {
          id: '',
          name: '男',
        },
        {
          id: '',
          name: '女',
        },
        {
          id: '',
          name: '保密',
        },
      ],
      required: true,
      radioType: '1',
      guid: 'd9d2da0d-faa4-4454-b05b-d21193a5f49c',
      relationId: null,
      relationChecks: [],
      relationFlag: false,
    },
    {
      name: '上传图片',
      type: 10,
      active: '1',
      tip: '',
      maxNum: 2,
      required: true,
      guid: 'eefc364e-ba07-4811-b839-4141fa0fbd90',
      relationId: 'd9d2da0d-faa4-4454-b05b-d21193a5f49c',
      relationChecks: [1],
      relationFlag: true,
    },
    {
      name: '多项选择',
      type: 8,
      tip: '多项选择',
      radio: [
        {
          id: '',
          name: '选项一',
        },
        {
          id: '',
          name: '选项二',
        },
      ],
      required: true,
      active: '1',
      guid: '58a24a0d-0fe5-4d80-831a-8cfc52c4a247',
      relationChecks: [],
      relationFlag: false,
    },
    {
      name: '占位符',
      tip: '分隔符',
      type: 15,
      display: 'show',
      pos: 'center',
      height: 32,
      guid: '07551253-9117-4c63-a490-34d9dedabb07',
      relationChecks: [],
      relationFlag: false,
    },
    {
      name: '文字说明',
      type: 12,
      tip: '这是一段文字说明，下面是图片组件，上面有个占位符组件',
      guid: 'c8dedf23-ed21-4fbc-a469-cc39165b2b38',
      relationChecks: [],
      relationFlag: false,
    },
    {
      type: 13,
      name: '图片展示',
      url: 'https://dev-ftecard.aijiatui.com/files/2021/0623/17a36af231d.jpeg',
      guid: 'd8697741-9271-478d-9d3d-551f4827d18d',
      relationChecks: [],
      relationFlag: false,
    },
  ],
  buttonText: '提交',
  shareCover: 'https://temp.aijiatui.com/ms-test/form/header/header_img_0.png',
  shareDescription: '在此诚挚邀请您参与我们的活动，感谢您的支持，谢谢！',
  shareTitle: '这是个表单',
}

// 查询表单
export function getForm(params, conf = {}) {
  return {
    id: params.id,
    ...defaultFormData,
  }
}

// 发送表单短信
export function sendSMS(params, conf = {}) {
  return true
}

// 验证短信
export function validSMSCode(params, conf = {}) {
  return true
}

// 验证短信
export function submitForm(params) {
  return console.log(params)
}
