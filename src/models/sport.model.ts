import { model, Schema } from 'mongoose';
import ISport from '../common/interfaces/models/ISport';

// Schema for sport
const sportSchema: Schema = new Schema<ISport>({
    sportName: {
        type: String,
        required: true
    }
});

// Create and export Model
export default model<ISport>('sport', sportSchema);