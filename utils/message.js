const moment = require('moment')

function formatMsg(user, text) {
  return { user, text, time: moment().format('h:mm a') }
}

module.exports = formatMsg
