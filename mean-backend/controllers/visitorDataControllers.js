const VisitorData = require('./../models/VisitorData')

module.exports.createVisitorData = async (req, res) => {
	try {
		let visitorData
		visitorData = new VisitorData(req.body)
		await visitorData.save()
		console.log(visitorData)
		res.send(visitorData)
	} catch (error) {
		console.log(error)
		res.status(500).send('Wystąpił błąd podczas dodawania danych', err)
	}
}



module.exports.getAllVisitorsData = async (req, res) => {
	try {
		let allVisitorsData = await VisitorData.find()
		console.log(allVisitorsData)
		res.json(allVisitorsData)
	} catch (err) {
		console.log(error)
		res.status(500).send('Wystąpił błąd podczas pobierania danych', err)
	}
}



module.exports.getSingleVisitorData = async (req, res) => {
	try {
		const singleVisitorData = await VisitorData.findOneById(req.params.id)
        console.log(singleVisitorData);
		res.send(visitorData)
	} catch (err) {
		console.log(error)
		res.status(500).send('Wystąpił błąd podczas pobierania danych', err)
	}
}



module.exports.filterByDate = async (req, res) => {
	try {
        let visitorData = await VisitorData.find({ visitorDate: req.params.jakasData })
        res.json(visitorData)
    } catch (err) {
        // res.status(500).send('Wystąpił błąd podczas filtrowania danych', err)
       console.log("błąd", err)
    
    }
}



module.exports.removeSingleVisitorData = async (req, res) => {
	try {
		await VisitorData.findByIdAndRemove(req.body.id)
		res.send('Usunięto')
	} catch (err) {
		res.status(500).send('Wystąpił błąd podczas usuwania danych', err)
	}
}
