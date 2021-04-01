import axios from 'axios'

export default (token = null) => {
  if (token) {
    return axios.create({
      headers: {
        Authorization: 'Bearer '.concat(token),
      },
    })
  }
  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'key=AAAAIhbPvPs:APA91bGAr8yUaUS2PXAmmU8IPQybzFXCPWwH7KN2JQUuv8xhQw4UbZQmIwpy85sUlz-IZTFEmLpU9cRfgb_mfq-0WmlmGurdIpM9mksS1PuxXozXyaL20h79fGlG-PP153cpX-d9QokP',
    },
  })
}
