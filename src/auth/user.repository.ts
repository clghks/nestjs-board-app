import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //   async createUser(request: AuthCredentialsDto): Promise<void> {
  //     const user = this.create({
  //       username: request.username,
  //       password: request.password,
  //     });
  //     await this.save(user);
  //   }
}
