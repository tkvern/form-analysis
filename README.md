<a href="https://gitpod.io/#https://github.com/tkvern/form-analysis"><img src="https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod" alt="Gitpod Ready-to-Code"></a>

# 表单解析引擎

本项目使用 React，使用模拟数据(`src/api/form.js`)运行 demo

## 解析器介绍

表单引擎有以下部分

- 表单设计器
- 表单存储
- 表单解析器

`表单设计器`

![image](https://user-images.githubusercontent.com/10667077/123079134-38c67580-d44e-11eb-8efe-b0725607c00b.png)

`表单存储`以下面结构约定解析规则

| 字段           | 类型                           | 描述                 |
| -------------- | ------------------------------ | -------------------- |
| type           | number                         | 组件类型             |
| tip            | string                         | 提示语               |
| guid           | string                         | 唯一 id              |
| name           | string                         | 名称                 |
| relationId     | string                         | 关联逻辑的组件 id    |
| relationChecks | []                             | 关联逻辑组件         |
| relationFlag   | boolean                        | 是否已经关联         |
| limit          | number                         | 长度限制             |
| verifyPhone    | number                         | 手机校验类型         |
| validType      | number                         | 校验类型             |
| required       | boolean                        | 是否必填             |
| radio          | { id: string, name: string }[] | 多选的选项           |
| active         | string                         | 多选默认选中项       |
| maxNum         | number                         | 上传图片的个数限制   |
| typeA          | number                         | 省市区选择器的类型   |
| display        | string                         | 占位符是否显示分割线 |
| height         | number                         | 占位符高度           |
| pos            | string                         | 占位符位置           |
| url            | string                         | 图片组件的 URL       |
| hide           | boolean                        | 是否隐藏组件         |

`表单解析器`解析渲染

![image](https://user-images.githubusercontent.com/10667077/123079553-a377b100-d44e-11eb-8eae-ec8ecd56b145.png)

## 运行项目

安装依赖( Node.js 版本 14.x)

```
$ npm install
```

运行服务

```
$ npm start
```

访问页面

http://localhost:8000/form/detail/asdasd
