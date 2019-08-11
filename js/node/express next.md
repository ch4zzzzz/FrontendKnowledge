# express next内部机制

next函数内部有个while循环，每次循环都会从stack中拿出一个layer，这个layer中包含了路由和中间件信息，然后就会用layer和请求的path就行匹配，如果匹配成功就会执行layer.handle_request，调用中间件函数。但如果匹配失败，就会循环下一个layer（即中间件）。

