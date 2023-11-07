console.log('qq')

const qq = import('Motor/Motor').then((MotorAll) => {
  // 使用 MyModule
  const Motor = MotorAll.default
  console.log(' myModule ', Motor);
  document.getElementById('motorContainer').innerHTML = ``;
  Motor.setBaseUrl('http://localhost:3000/v1.4.3')
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
});