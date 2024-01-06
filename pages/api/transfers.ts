import { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /api/transfers:
 *   get:
 *     summary: Retrieve NFT transfers based on query parameters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: round
 *         in: query
 *         description: Include results for the specified round. For performance reasons, this parameter may be disabled on some configurations.
 *         type: integer
 *       - name: next
 *         in: query
 *         description: Token for the next page of results. Use the `next-token` provided by the previous page of results.
 *         type: string
 *       - name: limit
 *         in: query
 *         description: Maximum number of results to return. There could be additional pages even if the limit is not reached.
 *         type: integer
 *       - name: contractId
 *         in: query
 *         description: Limit results to NFTs implemented by the given contract ID.
 *         type: integer
 *       - name: tokenId
 *         in: query
 *         description: Limit results to NFTs with the given token ID.
 *         type: integer
 *       - name: user
 *         in: query
 *         description: Limit results to transfers where the user is either the sender or receiver.
 *         type: string
 *       - name: from
 *         in: query
 *         description: Limit results to transfers with the given address as the sender.
 *         type: string
 *       - name: to
 *         in: query
 *         description: Limit results to transfers with the given address as the receiver.
 *         type: string
 *       - name: min-round
 *         in: query
 *         description: Limit results to transfers that were executed on or after the given round.
 *         type: integer
 *       - name: max-round
 *         in: query
 *         description: Limit results to transfers that were executed on or before the given round.
 *         type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransferResponse'
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
 *     Transfer:
 *       type: object
 *       properties:
 *         contractId:
 *           type: integer
 *         tokenId:
 *           type: integer
 *         from:
 *           type: string
 *         to:
 *           type: string
 *         round:
 *           type: integer
 * 
 *     TransferResponse:
 *       type: object
 *       properties:
 *         transfers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transfer'
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