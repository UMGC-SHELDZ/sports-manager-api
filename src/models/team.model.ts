import { model, Schema } from 'mongoose';
import ITeam from '../common/interfaces/models/ITeam';

// Schema for team
const teamSchema: Schema = new Schema<ITeam>({
    teamName: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    manager: {
        type: Schema.Types.ObjectId, ref: 'Manager'
    }
});

// Create and export Model
export default model<ITeam>('Team', teamSchema);