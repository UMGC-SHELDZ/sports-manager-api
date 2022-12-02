import { model, Schema } from 'mongoose';
import IManager from '../common/interfaces/models/IManager';

// Schema for manager
const managerSchema: Schema = new Schema<IManager>({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
});

// Create and export Model
export default model<IManager>('Manager', managerSchema);