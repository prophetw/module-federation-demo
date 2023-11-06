# 关于 MotorSDK 独立更新


## ProjA 是依赖 ProjBCommon
### ProjBCommon 向外暴露 MotorSDK 
> 当用户需要更新 MotorSDK 仅仅把 MotorSDK 包更新到 ProjBCommon 中即可，重新打包 ProjBCommon 即可
> 只要 ProjBCommon 不改变 MotorSDK 的包名，没有修改API，新增API，用户就不需要重新编译 ProjA

> ProjBCommon 用户仅仅是打包，部署到自己的私服中，供 ProjA 使用即可 


### ProjA 
> 需要配置 ProjBCommon 的地址
> 需要配置 MotorSDK 的 BaseUrl 
>

### ProjBCommon 
> 每次更新之后 pnpm build 发布到自己的服务器即可