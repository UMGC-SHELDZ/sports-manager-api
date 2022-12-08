import { Document, Types } from 'mongoose';


// interface for the Player Mongoose model
export default interface IPlayer extends Document {
    firstName: string;
    lastName: string;
    team?: Types.ObjectId;
    position?: string;
    playerNumber?: number;
}
