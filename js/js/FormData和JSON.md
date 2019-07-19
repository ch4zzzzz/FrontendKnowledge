# FORMDATA和JSON

Form的enctype属性：

| value                             | description                                        |
| --------------------------------- | -------------------------------------------------- |
| application/x-www-form-urlencoded | 初始默认值，在发送前编码所有字符                   |
| multipart/form-data               | 不对字符编码，可上传特殊类型的数据（.mp3, .jpg等） |
| text/plain                        | 纯文本传输                                         |

## FORMDATA

* 当把表单的编码类型设置为multipart/form-data ，则通过FormData传输的数据格式和表单通过submit() 方法传输的数据格式相同
* 可以直接上传文件

## JSON

* 需要上传文件时，使用Ajax序列化提交表单

