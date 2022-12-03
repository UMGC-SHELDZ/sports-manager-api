import { Query, Types } from 'mongoose';
import IPlayer from '../interfaces/models/player/IPlayer';
import ITeam from '../interfaces/models/team/ITeam';

// For query return types.
export type PlayerQueryResult = (IPlayer & {_id: Types.ObjectId;});

export type TeamQueryResult = (ITeam & {_id: Types.ObjectId;});