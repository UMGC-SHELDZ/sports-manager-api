import { Document } from 'mongoose';

// Interface for the Sport Mongoose model
export default interface ISport extends Document {
    sportName: string;
}