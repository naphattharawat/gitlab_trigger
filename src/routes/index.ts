import { RequestModel } from './../models/request';
import * as express from 'express';
import { Router, Request, Response } from 'express';
import e = require('express');

import * as HttpStatus from 'http-status-codes';
const requestModel = new RequestModel();

const router: Router = Router();

router.all('/', async (req: Request, res: Response) => {
  try {
    console.time('time')
    if (req.headers['x-gitlab-token'] == process.env.GITLAB_TOKEN) {
      const data = [];
      for (const url of Object.keys(process.env)) {
        if (url.match(/_URL/g)) {
         requestModel.trigger(process.env[url], req.body, req.headers)
          // data.push({ "name": url, "rs": rs });
        }
      }
      // console.log(data);
      res.send({ 'ok': true });
    } else {
      res.status(401);
      res.send({ error: '401' })
    }
    console.timeEnd('time')
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send({ error: error });
  }
});


export default router;