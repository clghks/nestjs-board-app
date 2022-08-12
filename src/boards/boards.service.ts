import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enuml';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });

    return await query.getMany();
    // return await this.boardRepository.find({ user: user });
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return board;
  }

  // createBoard(request: CreateBoardDto): Promise<Board> {
  //   return this.boardRepository.createBoard(request);
  // }

  async createBoard(request: CreateBoardDto, user: User): Promise<Board> {
    const board = this.boardRepository.create({
      title: request.title,
      description: request.description,
      status: BoardStatus.PUBLIC,
      user: user,
    });

    return await this.boardRepository.save(board);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    return await this.boardRepository.save(board);
  }

  async deleteBoard(id: number, user: User): Promise<void> {
    const result = await this.boardRepository.delete({ id: id, user: user });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
  }
}
