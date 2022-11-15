import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
  appId: process.env.APPID!,
  key: process.env.KEY!,
  secret: process.env.SECRET!,
  cluster: "ap1",
  useTLS: true
});

export const clientPusher = new ClientPusher(process.env.APPKEY!, {
  cluster: 'ap1'
})