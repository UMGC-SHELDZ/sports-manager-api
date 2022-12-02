import { model, Schema } from 'mongoose';
import ITeam from '../common/interfaces/models/team/ITeam';

// Schema for team
const teamSchema: Schema = new Schema<ITeam>({
    teamName: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    numPlayers: {
        type: Number,
        required: true
    }
});

// Create and export Model
export default model<ITeam>('Team', teamSchema);
