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
          requestModel.trigger(process.env[url], req.body, req.headers);
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


router.all('/one', async (req: Request, res: Response) => {
  try {
    const domain = req.query.domain;
    console.time('time')
    if (req.headers['x-gitlab-token'] == process.env.GITLAB_TOKEN) {
      const data = [];

      const url = process.env[`${domain}_URL`];

      if (url.length) {
        const rs = await requestModel.trigger(url, req.body, req.headers);
        console.log(rs);
        res.send(rs);
      } else {
        res.send({ error: 'no domain' });
      }
      // console.log(data);
    } else {
      res.status(401);
      res.send({ error: '401' })
    }
    console.timeEnd('time')
  } catch (error) {
    console.log('error', error);
    res.status(500);
    res.send({ error: error });
  }
});

export default router;