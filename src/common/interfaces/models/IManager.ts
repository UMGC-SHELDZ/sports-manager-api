import { Document } from 'mongoose';

// interface for the Manager Mongoose model
export default interface IManager extends Document {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
}