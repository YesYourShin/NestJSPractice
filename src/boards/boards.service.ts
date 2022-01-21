import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    // private를 사용하지 않으면 다른 컴포넌트에서 boards라는 배열 값을 수정할 수 있기 때문에
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }
}
