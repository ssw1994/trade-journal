import { LoginDto, SignInDto } from 'src/models/app.model';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    signIn(signInDto: SignInDto): Promise<import("./schemas/user.schema").User>;
    logIn(logindto: LoginDto): Promise<import("./schemas/user.schema").User>;
}
