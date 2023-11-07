# Webpack 5 Module Federation 方式对 MotorSDK 独立更新


> ProjA 是依赖 ProjBCommon
> ProjBCommon 可以是 MotorSDK 或者其他的公共库
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
> 两种方式，一个是用 Luban 生成的 Build ，一个是自己下载自己配置的 webpack.config.js 进行打包




## 使用方式

```bash

cd ProjBCommon
pnpm install 
pnpm build
cd dist
npx serve -p 3001 -C
# http://localhost:3001/remoteEntry.js // module federation 访问地址 可以随意部署到服务器的任意目录下,只要能访问到即可


cd ProjA
pnpm install
pnpm start
#ProjA/webpack.config.js
# 配置好上面 ProjBCommon 的地址

```



## 高级用法 动态加载 module federation 

```bash
# 1
cd ProjBCommon
pnpm i
pnpm build
mv ProjBCommon/dist nodeServe/public/v1.4.3

# 2
cd nodeServe
pnpm i 
pnpm start

# 3
cd ProjA
pnpm i 
pnpm start

#  http://localhost:3002/#/modFedDynamic
```

> 这种方式的 remoteEntry.js 是通过服务端提供的，这样就可以解决缓存问题，以及不同的版本的问题，服务端修改版本。客户端运行时加载最新的版本。

