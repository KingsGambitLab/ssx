import { ClientRequest, IncomingMessage } from 'http';
import Proxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

const handleProxyInit = (proxy: Proxy) => {
  /**
   * Check the list of bindable events in the `http-proxy` specification.
   * @see https://www.npmjs.com/package/http-proxy#listening-for-proxy-events
   */
  proxy.on('proxyReq', (proxyReq: ClientRequest) => {
    proxyReq.setHeader('referer', process.env.NEXT_PUBLIC_API_HOST_STAGING || '');
    proxyReq.setHeader('origin', process.env.NEXT_PUBLIC_API_HOST_STAGING || '');
    proxyReq.setHeader('Authorization', 'Basic aW1wYWN0OmdldHNoaXRkb25l');

    console.log('proxyReq', `${proxyReq.host}${proxyReq.path}`, proxyReq.getHeaders());
  });

  proxy.on('proxyRes', (proxyRes: IncomingMessage) => {
    console.log('proxyRes', proxyRes.statusCode);
  });
};

const proxyRequest = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

  return process.env.NODE_ENV === 'development'
    ? httpProxyMiddleware(req, res, {
      target: `${process.env.NEXT_PUBLIC_API_HOST_STAGING}`,
      pathRewrite: [
        // Scaler APIs without /api prefix
        {
          patternStr: '^/api/base_api/',
          replaceStr: '/',
        }
      ],
      onProxyInit: handleProxyInit,
    })
    : res.status(404).send(null);
};

export default proxyRequest;
