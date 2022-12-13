import { Document, Types } from 'mongoose';

// interface for the Team Mongoose model
export default interface ITeam extends Document {
    teamName: string;
    sport?: Types.ObjectId;
    manager?: Types.ObjectId;
}