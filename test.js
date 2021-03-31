const axios = require('axios')

const fetched = async () => {
    const data = await axios.post('http://localhost:3000/api/auth' , {
        email: 'wilmion92@gmail.com',
        password: '123456789'
        })
    console.log(data.data)
}
fetched();