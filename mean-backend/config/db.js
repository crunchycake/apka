const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })
const connectionDB = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});
		console.log('Połączono z bazą danych')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

module.exports = connectionDB
