import { UserEntity } from '@app/entities/main/user.entity';
import { Request, Response } from 'express';

export type TCustomRequestMeta = {
  userID?: string;
}

export type CustomRequest = Request & TCustomRequestMeta;

export interface IReqRes {
  req: CustomRequest;
  res: Response;
}

export interface IContextGQL extends IReqRes {
  userEntity?: UserEntity;
}