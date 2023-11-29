const glados = async () => {
  let cookie = process.env.GLADOS

  if (!cookie) return
  try {

    
          const response = await fetch("https://tingwu.aliyun.com/api/subscription/equity/gainEquity", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "bx-v": "2.5.5",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-b3-sampled": "1",
    "x-b3-spanid": "b8dccbb6000e4a03",
    "x-b3-traceid": "4cc5f97b45c4b2f465c5311f5a532f53",
    "x-tw-canary": "",
    cookie,
    "Referer": "https://tingwu.aliyun.com/equity/receive?pageType=3",
    "Referrer-Policy": "unsafe-url"
  },
  "body": "{\"equityType\":\"daily_sign_in\",\"equityCode\":\"every_day\"}",
  "method": "POST"
});

            console.log('response',response)
           const fetchRes = response
           const json = await fetchRes.json()
               console.log('json',json)
            const str = `${json.message} 签到日期 ${json.data.gainDate}`
            return  [
              '听悟签到OK',
              `${str}`,
            ]
           


  } catch (error) {
    return [
      'Checkin Error',
      `${error}`,
      `<${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}>`,
    ]
  }
}

const notify = async (contents) => {
  const token = process.env.NOTIFY
  if (!token || !contents) return
  await fetch(`https://www.pushplus.plus/send`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      token,
      title: contents[0],
      content: contents[1],
      template: 'markdown',
    }),
  })
}

const main = async () => {
  // await glados()
  await notify(await glados())
}

main()
