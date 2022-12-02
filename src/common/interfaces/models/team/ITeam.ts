import { Document } from 'mongoose';

// Interface for the Team Mongoose model
export default interface ITeam extends Document {
    teamName: string;
    managerName: string;
    numPlayers: number;
}