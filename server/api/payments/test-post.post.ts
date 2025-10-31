/**
 * Simple test POST route to verify POST routes work in this directory
 */
export default defineEventHandler(async (event) => {
  console.log('🧪 [TEST POST API] Test POST route called!')
  console.log('🧪 [TEST POST API] Method:', event.method)
  
  const body = await readBody(event).catch(() => ({}))
  
  return { 
    message: 'POST route works!',
    method: event.method,
    receivedBody: body,
    timestamp: new Date().toISOString()
  }
})

