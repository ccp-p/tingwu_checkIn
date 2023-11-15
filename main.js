const glados = async () => {
  let cookie = process.env.GLADOS

  if (!cookie) return
  try {

    
            const headers = {
                Cookie: cookie,
                'Content-Type': 'application/json;charset=UTF-8',
                'Origin': 'https://tingwu.aliyun.com',
                'Referer': 'https://tingwu.aliyun.com/',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Redmi K30 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36'
            };
    
          const reqData = {
            "equityCode": "every_day",
            "equityType": "daily_sign_in"
          }
            const url = 'https://tingwu.aliyun.com/api/subscription/equity/gainEquity';
            // fetch
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(reqData)
            })
            return  [
              'Checkin OK',
              `${response}`,
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
      content: contents.join('<br>'),
      template: 'markdown',
    }),
  })
}

const main = async () => {
  // await glados()
  await notify(await glados())
}

main()
