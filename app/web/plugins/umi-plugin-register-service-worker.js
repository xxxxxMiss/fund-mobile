const fs = require('fs')
const path = require('path')

module.exports = api => {
  api.addEntryCode(() => {
    const content = fs.readFileSync(
      path.join(__dirname, '../pwa/register-service-worker.js'),
      'utf-8'
    )
    return content
  })
}
