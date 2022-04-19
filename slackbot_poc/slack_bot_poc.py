import slack
import os
import string
from pathlib import Path
from dotenv import load_dotenv
from flask import Flask, request, Response
from slackeventsapi import SlackEventAdapter
from datetime import datetime, timedelta
from pprint import pprint

from date_parsers import (
    clean_birthday,
    get_current_date_str,
)

app = Flask(__name__)

env_path = Path('.') / '.env'
load_dotenv(dotenv_path=env_path)

slack_event_adapter = SlackEventAdapter(os.environ['SIGNING_SECRET'],'/slack/events',app)

client = slack.WebClient(token=os.environ['SLACK_TOKEN'])
client.chat_postMessage(channel='#birthdays', text='Happy Birthday Muhammad!')
BOT_ID = client.api_call('auth.test')['user_id']
welcome_messages = dict()


def get_users_birthdays_list():
    try:
        result = client.users_list()
        return save_users(result["members"])

    except Exception as e:
        print("Error getting user profile: {}".format(e))

def save_users(users):
    users_res = list()

    for user in users:
        user_info = client.users_profile_get(user=user['id'])

        data = {"name": f'{user_info["profile"]["first_name"]} {user_info["profile"]["last_name"]}',
                "custom_fields": user_info["profile"]["fields"]
                }
        users_res.append(data)

        try:
            current_date = get_current_date_str()
            u_birthday = clean_birthday(data)
            if u_birthday is not None:
                if u_birthday == current_date:
                    send_welcome_message(f'@{user["id"]}', user["id"])
                else:
                    ...

        except Exception as e:
            ...

    return users_res

class WelcomeMessage:

    START_TEXT = {
        'type': 'section',
        'text': {
            'type': 'mrkdwn',
            'text': (
                '*** Happy Birthday Muhammad ***\n\n'
                'bill $100 in this month invoice and this will be our gift for your HBD...'
            )
        }
    }

    DIVIDER = {
			"type": "divider",
			"block_id": "divider1"
		}

    def __init__(self, channel, user):
        self.channel = channel
        self.user = user
        self.icon_emoji = ':robot_face:'
        self.timestamp = ''
        self.completed = False


    def get_message(self):
        return {
            'ts': self.timestamp,
            'channel': self.channel,
            'username': 'Welcome Birthday Bot!',
            'icon_emoji': self.icon_emoji,
            'blocks': [
                self.START_TEXT, 
                self.DIVIDER, 
                self._get_reaction_task()
                ]
        }

    # create private method
    def _get_reaction_task(self):
        checkmark = ':white_check_mark:'

        if not self.completed:
            checkmark = ':white_large_square:'

        text = f'{checkmark} React to this message.'

        res = {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": text
        }
        }
        return res


def send_welcome_message(channel, user):

    if channel not in welcome_messages:
        welcome_messages[channel] = {}

    if user in welcome_messages[channel]:
        return

    welcome = WelcomeMessage(channel, user)

    message = welcome.get_message()

    response = client.chat_postMessage(**message)

    welcome.timestamp = response['ts']
    
    welcome_messages[channel][user] = welcome


@slack_event_adapter.on('message')
def message(payload):
    event = payload.get('event', {})
    channel_id = event.get('channel', None)
    user_id = event.get('user', None)
    text = event.get('text', None)

    if user_id != None and BOT_ID != user_id:

        if text.lower() == 'users':
            get_users_birthdays_list()

if __name__ == "__main__":

    app.run(debug=True) 







