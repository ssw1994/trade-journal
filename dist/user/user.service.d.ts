import { LoginDto, SignInDto } from '../models/app.model';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    singIn(signInDto: SignInDto): Promise<User>;
    loginIn(loginDto: LoginDto): Promise<User>;
}
