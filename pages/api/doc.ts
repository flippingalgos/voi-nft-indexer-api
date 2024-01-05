import { withSwagger } from 'next-swagger-doc';

const swaggerHandler = withSwagger({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'api.flippingalgos.xyz',
      version: '0.1.0',
    },
  },
  schemaFolders: ['models'],
});
export default swaggerHandler();