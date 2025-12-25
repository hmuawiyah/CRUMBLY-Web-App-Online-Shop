import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import userAddressesRoute from './routes/userAddresses.route.js'
import productRoute from './routes/product.route.js'
import orderRoute from './routes/orders.route.js'
import midtransRoute from './routes/midtrans.route.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5003

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/useraddresses', userAddressesRoute)
app.use('/api/product', productRoute)
app.use('/api/order', orderRoute)
app.use('/api/midtrans', midtransRoute)

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`)
})
