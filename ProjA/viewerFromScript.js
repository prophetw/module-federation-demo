/// <reference path="../Motor.d.ts" />
// @ts-check

function loadScript(url, callback = ()=>{
  // 
}) {
  const script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {  // IE
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.body.appendChild(script);
}

function initViewer(){
  const serverUrl = 'https://open.lubansoft.com/api';
  const appId = 'd0b3c61c6639434e84900b1fd8d391cb'
  const secret = '459dc8b77a63a0c009aec27f818febf6'
  const projectId = 'cd35af5eaed64d6a88619d55584e8311'
  let currentProject = undefined
  /** @type {import('@motor/core')} */
  const Motor = window.Motor
  function InitViewer() {
    const viewer = new Motor.Viewer({
      container: 'motorContainer',
      baseUrl: serverUrl,
      appId: appId,
      secret: secret,
    })
    return viewer
  }
  const openProj = async (projId) => {
    const viewer = InitViewer()
    viewer.renderEffect.iblEnvmapUrl = 'http://192.168.2.192:8081/MotorSDK/latest/motorAssets/environmentMap/hdr/sky_2k.hdr'
    await viewer.Init()
    currentProject = await viewer.queryProject(projId)
    if(currentProject){
      await currentProject.open()
      if (currentProject.viewPosition) {
        viewer.camera?.setViewToViewPosition(currentProject.viewPosition)
      } else {
        viewer.camera?.setViewToProject(currentProject)
      }
    }
  }
  openProj(projectId)

}

const ViewerApp = () => {
  // url 为 Motor.js 的地址 
  // const url = 自己服务器里面的地址
  document.getElementById('motorContainer').innerHTML = ``;
  const url = 'http://192.168.2.192:8081/MotorSDK/latest/Motor.js' // 入口地址
  loadScript(url, ()=>{
    /** @type {import('@motor/core')} */
    const Motor = window.Motor
    Motor.setBaseUrl('http://192.168.2.192:8081/MotorSDK/latest/') // 静态资源的根目录的 baseUrl
    initViewer()
  })
}
export default ViewerApp;