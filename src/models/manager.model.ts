import { model, Schema } from 'mongoose';
import IManager from '../common/interfaces/models/IManager';
import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 10;

// Schema for manager
const managerSchema: Schema = new Schema<IManager>({
    userName: {
        type: String,
        unique: true,
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

// Method that runs before save and hashes password
managerSchema.pre('save', function(next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // Hash password
    bcrypt
        .genSalt(SALT_WORK_FACTOR)
        .then((salt: any) => {
            return bcrypt.hash(user.password,salt);
        })
        .then((hash: any) => {
            user.password = hash;
            next();
        })
});

// Create and export Model
export default model<IManager>('Manager', managerSchema);