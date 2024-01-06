import { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /api/v1/tokens:
 *   get:
 *     description: Retrieve NFT tokens based on query parameters
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: round
 *          in: query
 *          required: true
 *        - name: owner
 *          in: query
 *          required: true
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         owner:
 *           type: string
 *         contractId:
 *           type: integer
 *         tokenId:
 *           type: integer
 *         mint-round:
 *           type: integer
 *         metadataURI:
 *           type: string
 *         metadata:
 *           type: object
 *
 *     TokenResponse:
 *       type: object
 *       properties:
 *         tokens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Token'
 *         current-round:
 *           type: integer
 *         next-token:
 *           type: string
 *
 *     Error:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *         message:
 *           type: string
 */

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse,
  ) => {
    
    res.status(200).json(true);
  };
  
  export default handler;