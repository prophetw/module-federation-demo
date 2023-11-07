import axios from "axios";
async function loadRemoteModule(remoteConfig) {
  const script = document.createElement('script');
  script.src = remoteConfig.url;
  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => {
      const remoteModule = window[remoteConfig.scope];
      resolve(remoteModule)
    };
    script.onerror = () => {
      reject(new Error(`Remote module ${remoteConfig.url} failed to load`));
    };
  });
}

async function init() {
  try {
    const remoteConfig = await axios.request(
      {
        url: 'http://localhost:3000/api/config',
        method: 'post',
      }
    )
    console.log('--- remote config --- ', remoteConfig);
    await __webpack_init_sharing__('default')
    const remoteModule = await loadRemoteModule(remoteConfig.data);
    const module = await remoteModule.get(remoteConfig.data.module);
    const MotorAll = module();

    const Motor = MotorAll.default
    console.log(' myModule ', Motor);
    document.getElementById('motorContainer').innerHTML = ``;
    Motor.setBaseUrl(remoteConfig.data.baseUrl)
    const serverUrl = 'https://open.lubansoft.com/api'
    const appId = 'd0b3c61c6639434e84900b1fd8d391cb'
    const secret = '459dc8b77a63a0c009aec27f818febf6'
    const projectId = 'cd35af5eaed64d6a88619d55584e8311'
    let currentProject = undefined
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
      await viewer.Init()
      currentProject = await viewer.queryProject(projId)
      await currentProject.open()
      if (currentProject.viewPosition) {
        viewer.camera.setViewToViewPosition(currentProject.viewPosition)
      } else {
        viewer.camera.setViewToProject(currentProject)
      }
    }
    openProj(projectId)


  } catch (error) {
    console.error('Failed to load remote module:', error);
  }
}

export default init;