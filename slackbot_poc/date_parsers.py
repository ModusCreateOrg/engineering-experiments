from datetime import date


def clean_birthday(data):
    parse_data = list(list(data['custom_fields'].items())[0])
    if data['custom_fields'] or data['custom_fields'] is not None:
        user_birthday = parse_data[1]['value']
        b_date_lst = user_birthday.split('-')[1:]
        b_date_str = '-'.join(b_date_lst)
        return b_date_str

    return None

def get_current_date_str():
    today = date.today()
    today_str = today.strftime("%m-%d")
    return today_str
