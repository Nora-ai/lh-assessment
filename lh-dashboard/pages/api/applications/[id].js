import dbConnect from '../../../utils/dbConnect'
import Application from '../../../models/Application'
import Cohort from '../../../models/Cohort';

dbConnect();

export default async function ApplicationRequestById(req, res) {
  const { 
     query: { id },
     method 
  } = req

  switch(method) {
      case 'GET':
          try {
            const application = await Application.findById(id).populate('cohort').exec((err, Cohort) => {console.log("Populated Applicatiton " + Cohort)})


            if (!application) {
                return res.status(400).json({ success: false})
            }

            res.status(200).json({ success: true, data: application })
          } catch (error) {
            res.status(400).json({ success: false})
          }
        break
    case 'PUT':
        try {
            const application = await Application.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            })

            if (!application) {
                return res.status(400).json({ success: false })
            }
            res.status(200).json({ success: true, data: application})
        } catch(error) {
            res.status(400).json({ success: false })
        }
        break
    case 'DELETE':
        try {
            const deletedApplication = await Application.deleteOne({ _id: id})

            if(!deletedApplication) {
                return res.status(400).json({ success: false })
            }

            res.status(200).json({ success: true, data: {}})
        } catch (error) {
            res.status(400).json({ success: false })
        }
        break
    default:
        res.status(400).json({ success: false })
        break
  }
}