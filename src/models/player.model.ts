import { model, Schema } from 'mongoose';
import IPlayer from '../common/interfaces/models/IPlayer';

// Schema for player
const playerSchema: Schema = new Schema<IPlayer>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    team: {
        type: Schema.Types.ObjectId, ref: 'Team'
    },
    positions: {
        type: [String]
    },
    playerNumber: {
        type: Number
    },
    salary: Number,
    statistics: [
        {
            statisticName: String,
            stastisicValue: String
        }
    ]
});

// Create and export Model
export default model<IPlayer>('Player', playerSchema);
