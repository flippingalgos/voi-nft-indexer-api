import { NextApiRequest, NextApiResponse } from 'next'

/**
 * @swagger
 * /api/v1/tokens:
 *   get:
 *     description: Retrieve NFT tokens based on query parameters
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: round
 *         in: query
 *         description: Include results for the specified round.
 *         type: integer
 *       - name: next
 *         in: query
 *         description: Token for the next page of results. Use the `next-token` provided by the previous page of results.
 *         type: string
 *       - name: limit
 *         in: query
 *         description: Maximum number of results to return.
 *         type: integer
 *       - name: contractId
 *         in: query
 *         description: Limit results to NFTs implemented by the given contract ID.
 *         type: integer
 *       - name: tokenId
 *         in: query
 *         description: Limit results to NFTs with the given token ID.
 *         type: integer
 *       - name: owner
 *         in: query
 *         description: Limit results to NFTs owned by the given owner.
 *         type: string
 *       - name: mint-min-round
 *         in: query
 *         description: Limit results to NFTs minted on or after the given round.
 *         type: integer
 *       - name: mint-max-round
 *         in: query
 *         description: Limit results to NFTs minted on or before the given round.
 *         type: integer
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