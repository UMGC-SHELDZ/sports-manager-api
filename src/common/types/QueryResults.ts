import { Query, Types } from 'mongoose';
import IPlayer from '../interfaces/models/IPlayer';

// For query return types.
export type PlayerQueryResult = (IPlayer & {_id: Types.ObjectId;});