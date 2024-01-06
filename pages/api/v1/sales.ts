import { NextApiRequest, NextApiResponse } from 'next'
/**
 * @swagger
 * /api/v1/sales:
 *   get:
 *     description: Get Sales by asa_id
 *     parameters:
 *        - name: asa_id
 *          in: query
 *          required: true
 *        - name: x-access-token
 *          in: header
 *          required: true
 *        - name: asa_id2
 *          in: query
 *          required: true
 *     responses:
 *       200:
 *         description: return object of one events
 */
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(400).json({
    error: "REQUEST METHOD NOT VALID only GET",
    success: false
  }) 

  const {asa_id} = req.query;
  if(asa_id){
    res.status(200).json({error: false, message: "asa sales found: " + asa_id});
  }else{
    res.status(400).json({error: true, message: "sales for asa_id not found"});
  }
};

export default handler;