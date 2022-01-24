import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    // private를 사용하지 않으면 다른 컴포넌트에서 boards라는 배열 값을 수정할 수 있기 때문에
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string) {
        const board: Board = {
            id: uuid(),
            // title: title, 이면 밑에 형식으로 쓸 수 있음
            title,
            // description: description, 위와 같이
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    } 
}
