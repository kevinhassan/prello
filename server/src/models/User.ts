import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import Team from "./Team";

export type UserModel = mongoose.Document & {
    name: string,
    username: string,
    initials: string,
    bio: string,
    email: string,
    password: string,
    avatarUrl: string,
    teams: [typeof mongoose.Schema.Types.ObjectId],
    notifications: [typeof mongoose.Schema.Types.ObjectId]
    comparePassword: comparePasswordFunction,
    gravatar: (size: number) => string
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const userSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    initials: String,
    bio: String,
    email: { type: String, unique: true, required: true },
    password: String,
    avatarUrl: String,
    teams: {
      type: [typeof mongoose.Schema.Types.ObjectId],
      ref: "Team"
    },
    notifications: {
      type: [typeof mongoose.Schema.Types.ObjectId],
      ref: "Notification"
    }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number) {
    if (!size) { size = 200; }
    if (!this.email) { return `https://gravatar.com/avatar/?s=${size}&d=retro`; }

    const md5 = crypto.createHash("md5").update(this.email).digest("hex");
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model("User", userSchema, "Users");
export default User;
