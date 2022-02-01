const help = () => {
    return `Hi my dear friend, here are the commands
    **$play**       to start game
    **$state**      to view the game state
    **$make X Y**   to make a play in started game
    **$reset**      to reset the game`;
}

const time = () => {
    let date = new Date();
    return `The time is ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const formatState = ( cat ) => {
    return `
**X  0, 1, 2
0 [${cat.board[0][0]}, ${cat.board[0][1]}, ${cat.board[0][2]}]
1  [${cat.board[1][0]}, ${cat.board[1][1]}, ${cat.board[1][2]}]
2 [${cat.board[2][0]}, ${cat.board[2][1]}, ${cat.board[2][2]}]**`;
}

const validPlay = ( cat, pos ) => cat.board[pos[0]][pos[1]] == '-';
        

const makeAPlay = ( cat, pos ) => {
    cat.board[pos[0]][pos[1]] = (cat.turn?'X':'O');
    cat.turn = !cat.turn;
    cat.turns_playes++;
}

const tryBotPlay = ( cat ) => {
    if ( cat.turn ) return; 
    let played = false;
    let pos;
    while( !played ) {

        pos = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
        if( validPlay(cat, pos) ) {
            makeAPlay(cat, pos);
            played = true;
        }
    }
}

const finalizedGame = ( cat ) => {
    if ( cat.turns_played < 3 ) return false;
    
    //principal diagonal
    if (cat.board[0][0] === cat.board[1][1] && cat.board[1][1] === cat.board[2][2]) {
        if (cat.board[0][0] !== '-') return cat.board[0][0];
    }
    //secundary diagonal
    if (cat.board[0][2] === cat.board[1][1] && cat.board[1][1] === cat.board[2][0]) {
        if (cat.board[0][2] !== '-') return cat.board[0][2];
    }

    for (let i = 0; i<3; i++) {
        //horizontal
        if (cat.board[i][0] === cat.board[i][1] && cat.board[i][1] === cat.board[i][2]) {
            if (cat.board[i][0] !== '-') return cat.board[i][0];
        }
        //vertical
        if (cat.board[0][i] === cat.board[1][i] && cat.board[1][i] === cat.board[2][i]) {
            if (cat.board[0][i] !== '-') return cat.board[0][i];
        }
    }

    for ( let i = 0; i<3; i++ )
        for ( let j = 0; j<3; j++ )
            if ( cat.board[i][j] === '-') return false;

    return 'E';
}

const resetGame = ( cat ) => cat = {
    state: false,
    turn: 1,
    turns_played: 0,
    winner: 0,
    board: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
};

module.exports = {
    help, time,
    formatState, makeAPlay, tryBotPlay,
    finalizedGame, resetGame
};