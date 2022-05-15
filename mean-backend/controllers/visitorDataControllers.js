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

module.exports.filterByDate = async (req, res) => {
	try {
		let visitorData = await VisitorData.find({ visitorDate: req.params.jakasData })
		res.json(visitorData)
	} catch (err) {
		// res.status(500).send('Wystąpił błąd podczas filtrowania danych', err)
		console.log('błąd', err)
	}
}

module.exports.editSingleVisitorData = async (req, res) => {
	try {
		const { visitorName, visitorFamilyName, visitorDate, visitorHours, visitorInstitution, visitorComment } = req.body
		let visitorData = await VisitorData.findById(req.params._id)
		console.log('_id', req.body)

		if (!visitorData) {
			res.status(404).json('brak produktu')
		}

		visitorData.visitorName = visitorName
		visitorData.visitorFamilyName = visitorFamilyName
		visitorData.visitorDate = visitorDate
		visitorData.visitorHours = visitorHours
		visitorData.visitorInstitution = visitorInstitution
		visitorData.visitorComment = visitorComment

		visitorData = await VisitorData.findByIdAndUpdate({ _id: req.params._id }, visitorData, { new: true })
		res.json(visitorData)
	} catch (err) {
		console.log(error)
		res.status(500).send('Wystąpił błąd podczas edycji danych', err)
	}
}

module.exports.removeSingleVisitorData = async (req, res) => {
	try {
		visitorData = await VisitorData.findByIdAndRemove({ _id: req.params._id })
		res.json(visitorData)
	} catch (err) {
		res.status(500).send('Wystąpił błąd podczas usuwania danych', err)
	}
}
