import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enuml';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  //   async createBoard(request: CreateBoardDto): Promise<Board> {
  //     const board = this.create({
  //       title: request.title,
  //       description: request.description,
  //       status: BoardStatus.PUBLIC,
  //     });
  //     return await this.save(board);
  //   }
}
