import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  // private를 사용하지 않으면 다른 컴포넌트에서 boards라는 배열 값을 수정할 수 있기 때문에
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    // const title = createBoardDto.title; 밑에 형식으로도 쓸 수 있음
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      // title: title, 이면 밑에 형식으로 쓸 수 있음
      title,
      // description: description, 위와 같이
      description,
      status: BoardStatus.PUBLIC,
    };

    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
