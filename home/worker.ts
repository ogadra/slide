// worker.ts
import handle from 'hono-react-router-adapter/cloudflare-workers'
import * as build from './build/server'
import server from './server'

export default handle(build, server)
