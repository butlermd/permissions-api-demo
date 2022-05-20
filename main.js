import './style.css'

const avStatus = {
  cam: 'querying...',
  mic: 'querying...'
}
let lastUpdate

window.request = () => navigator.mediaDevices.getUserMedia({video: true, audio: true})

const render = () => {
  document.querySelector('#app').innerHTML = `
    <h1>Permissions Status</h1>
    <div><button onclick="window.request()">Request</button></div>
    <div>Camera: ${avStatus.cam}</div>
    <div>Microphone: ${avStatus.mic}</div>
    <div><small><i>Last Update: ${lastUpdate}</i></small></div>
  `
}

render()

const handlePermissionStatus = (status, aorv) => {
  avStatus[aorv] = status.state
  lastUpdate = new Date()
  render()
  status.addEventListener('change', () => {
    avStatus[aorv] = status.state
    lastUpdate = new Date()
    render()
  })
}


navigator.permissions.query({name:'camera'}).then(status => handlePermissionStatus(status, 'cam'))
navigator.permissions.query({name:'camera'}).then(status => handlePermissionStatus(status, 'mic'))

