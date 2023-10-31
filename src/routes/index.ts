import { RequestModel } from './../models/request';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import e = require('express');

import * as HttpStatus from 'http-status-codes';
const requestModel = new RequestModel();

const router: Router = Router();

router.all('/', async (req: Request, res: Response) => {
  try {
    if (req.headers['x-gitlab-token'] == process.env.GITLAB_TOKEN) {
      const data = [];
      for (const url of Object.keys(process.env)) {
        if (url.match(/_URL/g)) {
          const rs = await requestModel.trigger(process.env[url], req.body, req.headers)
          data.push({ "name": url, "rs": rs });
        }
      }
      console.log(data);
      
      res.send(data);
    } else {
      res.status(401);
      res.send({ error: '401' })
    }
  } catch (error) {
    res.status(500);
    res.send({ error: error });
  }
});


export default router;