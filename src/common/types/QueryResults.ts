import { Query, Types } from 'mongoose';
import IPlayer from '../interfaces/models/IPlayer';
import ITeam from '../interfaces/models/ITeam';

// For query return types.
export type PlayerQueryResult = (IPlayer & {_id: Types.ObjectId;});
export type TeamQueryResult = (ITeam & {_id: Types.ObjectId;});