import { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/transfers/{address}:
 *   get:
 *     description: Get Transfers by address
 *     parameters:
 *        - name: address
 *          in: path
 *          required: true
 *     responses:
 *       200:
 *         description: return object
 *       400:
 *         description: return was unsuccessful
 *       500:
 *         description: return was unsuccessful
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(400).json({
    error: true,
    message: "REQUEST METHOD NOT VALID only GET"
  }) 
  try {
      const {address} = req.query;
      if(address){
        return res.status(200).json({success: false, message: "address found"})
      } else {
        return res.status(400).json({success: false, message: "address cannot be empty"})
      }
  } catch (error) {
    return res.status(400).json({success: false, message: "Error: " + error.message})
  }
};

export default handler;