import { Document, Types } from 'mongoose';

// Private interface for statistic object to be used with IPlayer
interface IStatistic {
    statisticName: string;
    statisticValue: number;
}

// interface for the Player Mongoose model
export default interface IPlayer extends Document {
    firstName: string;
    lastName: string;
    team?: Types.ObjectId;
    positions?: Array<string>;
    playerNumber?: number;
    salary?: number;
    statistics?: Array<IStatistic>;
}
