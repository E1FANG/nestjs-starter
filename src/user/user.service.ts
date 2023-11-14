import { Injectable, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    return this.usersRepository.save(data);
  }

  async findAll(
    @Query() query: { keyWord: string; pageNum: number; pageSize: number },
  ) {
    const data = await this.usersRepository.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.pageNum - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.usersRepository.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
    return {
      code: 200,
      message: 'success',
      data,
      total,
    };
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
