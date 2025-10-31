/**
 * Test route to verify payments API directory routing works
 */
export default defineEventHandler(async (event) => {
  console.log('🧪 [TEST API] Test route called!')
  return { 
    message: 'Payments API routing works!',
    timestamp: new Date().toISOString()
  }
})

