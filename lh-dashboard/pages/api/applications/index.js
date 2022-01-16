import dbConnect from '../../../utils/dbConnect'
import Application from '../../../models/Application'

dbConnect();

export default async function AppRequests(req, res) {
  const { method } =  req

  switch(method) {
    case 'GET':
      try {
        const applications = await Application.find({})

        res.status(200).json({ success: true, data: applications })
      } catch(error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const application = await Application.create(req.body)

        res.status(201).json({ success: true, data: application })
      } catch(error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
