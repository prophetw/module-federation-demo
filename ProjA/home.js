const HomeApp = () => {

  console.log('this is home page ')
  document.getElementById('motorContainer').innerHTML = `
    <div id="home-container">
      <h1>Home Page</h1>
      <div>
        <a href="/#/home">home</a>
      </div>
      <div>
        <a href="/#/viewer">viewer from import </a>
      </div>
      <div>
        <a href="/#/viewerFromScript">viewer from script</a>
      </div>
      <div>
        <a href="/#/modFedDynamic">modFedDynamic</a>
      </div>
    </div>
  `
}

export default HomeApp;