
module.exports = {
  janus: {
    url: 'https://localhost:8989',
    keepAliveIntervalMs: 30000,
    options: {
      rejectUnauthorized: false
    },
    filterDirectCandidates: true,
    recordDirectory: '/workspace/records/',
    bitrate: 774144,
    firSeconds: 10,
    publishers: 20
  },
  peerConnectionConfig: {
    iceServers: [
      { url: 'stun.voip.eutalia.it:3478' },
      { username: 'apostles00', url: 'turn:165.22.137.67:3478?transport=udp', credential: 'Zero!' },
      { username: 'apostles00', url: 'turn:165.22.137.67:3478?transport=tcp', credential: 'Zero!' }
    ]
  }
}
