const Discord = require('discord.js');
const schedule = require('node-schedule');
const client = new Discord.Client();
let month;
let day;
let hour;
let minute;

const emojis = ['😀',  '😃' , '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👋', '🤚', '🖐', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦵', '🦿', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄', '💋', '🩸'];

// 봇이 켜지면 실행되는 로직
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const Channel = client.channels.cache.get("763585544265007124"); // Searching the channel in the collection channels.
    if (!Channel) {
      return console.error("No channel found!"); // If the channels does not exist or the bot cannot see it, it will return an error.
    } else {
      return Channel.send("Your message to send here!"); // We found the channel. Sending a message to it.
    };
});

// 메세지 이벤트가 발생할경우 실행되는 로직
client.on('message', msg => {
    let content = msg.content;

    // 메세지가 ~ 으로 시작할 경우
    if(msg.content[0] === '~') {
        content = content.slice(1);

        if(content === '') {
            msg.reply('~help 를 통해 명령어를 보실 수 있습니다.');
        }
        
        if(content === 'help') {
            msg.reply('아직 구현 안 함 ㅅㄱ');
        }

        if(content === 'papering') {
            emojis.forEach(element => {
                msg.react(element);
            });
        }

        // if(content.slice(0, 7) == 'mention') {
        //     console.log(msg.mentions.members.size);
        //     console.log(msg.mentions.members.toJSON()[0].userID);
        //     msg.channel.send(`<@${msg.mentions.members.first().user.id}>`);
        // }

        if(content.slice(0, 3) === 'add') {
            if(content.length == 3) {
                msg.reply('~add [일정 이름] [mm-dd] [hh-mm]');
            }
            else {
                // 날짜와 시간 쪼개는 부분 ------------------------
                content = content.slice(4);
                let arr = content.split(' ');
                let input = arr[0];
                let monthDay = arr[1].split(':');
                let hourMinute = arr[2].split(':');
                month = monthDay[0];
                day = monthDay[1];
                hour = hourMinute[0];
                minute = hourMinute[1];

                msg.reply(month + '월 ' + day + '일 ' + hour + '시 ' + minute + '분 ' + input + '을(를) 하기로 예약했습니다.');

                let usertime = '0 ' + minute + ' ' + hour + ' ' + day + ' ' + month + ' *';
//              --------------------------------------------------- 

                // 언급된 사용자의 아이디를 구하는 로직
                let userIds = [];
                for(var i=0; i<msg.mentions.members.size; i++) {
                    userIds[i] = msg.mentions.members.toJSON()[i].userID;
                }

                // -------------------------------------------------

                // 스케쥴을 사용한 원하는 시간에 알림이 가는 로직
                var job = schedule.scheduleJob(usertime, function() {
                    msg.reply(month + '월 ' + day + '일 ' + hour + '시 ' + minute + '분 예약알림\n내용 : ' + input + '\n');
                    for(var i=0; i<userIds.length; i++) {
                        msg.channel.send(`<@${userIds[i]}>`);
                    }
                    job.cancel();
                });
                // ----------------------------------------------
            }
        }

    }

    if(content === '자꾸~') {
        msg.channel.send('아찔한 이 느낌~');
    }

    if(content === '리액션부탁.') {
        msg.react('👍');
    }

    if(content === '내 이름은 김근육') {
        msg.channel.send('안녕 나는 눈물의 요정!')
    }
    
});

client.login('access token')