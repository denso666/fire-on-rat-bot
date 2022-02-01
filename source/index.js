const Discord = require( 'discord.js' );
const commands = require('./commands');
require('dotenv').config()

//  Confing
const token = process.env.TOKEN;
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix = '$';

// to play
const catState = {
    state: false,
    turn: 1,
    turns_played: 0,
    winner: 0,
    board: [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]
};
const checkGameState = ( message ) => {

    let final = commands.finalizedGame( catState );

    if ( final === 'E' || final === 'X' || final === 'O' ) {
        commands.resetGame(catState);
        message.channel.send("Then game ended");

        switch( final ) {
            case 'E': message.channel.send("---> DRAW"); break;
            case 'X': message.channel.send(`---> ${message.author.tag} WIN!`); break;
            case 'O': message.channel.send("---> I win, jaja, dump!"); break;
        }
    }
}


//  Handlers
client.on("messageCreate", function(message) { 
    
    if (message.author.bot) return;
    if (!(message.content.startsWith(prefix))) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    let response;
    
    switch( command ) {
        case 'help':
        case 'h': response = commands.help(); break;
        case 'time': response = commands.time(); break;

        case 'play': {
            catState.state = true;
            response = "The play was start!\nMake a play with **$make X Y**\n";
            response += commands.formatState(catState);
            break;
        }
        case 'state': {
            response = commands.formatState( catState );
            break;
        }
        case 'make': {
            if ( !catState.state ) response = "Hey, you haven't started a game!";
            else if ( args.length < 2 ) response = "I need 2 arguments, [X Y] separated by spaces";
            else {
                pos = [parseInt(args[0]), parseInt(args[1])];
                commands.makeAPlay(catState, pos);
                response = `Play do it by ${message.author.tag}!, in ${args}`;
                response += "\n" + commands.formatState(catState);
            }
            break;
        }
        case 'reset': {
            commands.resetGame( catState );
            response = "The game was reset!";
            break;
        }

        default: response = commands.help();
    }

    // reply the answer of a command
    message.reply( response );
    checkGameState( message );

    commands.tryBotPlay( catState );
    checkGameState( message );
}); 


//  Login
client.login( token );