# Script created by Simon
# DVRKZ DISTRIBUTION GAME_COMMENT_SPAMMER
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
import requests
import json
import re
import time
from bs4 import BeautifulSoup
from colorama import Fore, Style, init
from datetime import datetime, timedelta
import itertools

init(autoreset=True)

# Script Variables
REPROCESS_DELAY = 120  # 2 minute debounce to avoid API limit
COMMENT_DELAY = 1     # Delay between posting each comment (seconds)
LOGIN_LOGOUT_DELAY = 2  # Delay between each login and logout (seconds)
COMMENTS_PER_ACCOUNT = 1  # Number of comments to post per account before switching
ACCOUNT_FAILURE_MARK = '// '  # Marker for failed login accounts

# Gradient colors using colorama
RAINBOW_COLORS = [
    Fore.RED, Fore.LIGHTRED_EX, Fore.YELLOW, Fore.LIGHTYELLOW_EX,
    Fore.LIGHTGREEN_EX, Fore.CYAN, Fore.LIGHTCYAN_EX, Fore.BLUE,
    Fore.MAGENTA, Fore.LIGHTMAGENTA_EX
]

# Iterator to cycle through the colors
color_iterator = itertools.cycle(RAINBOW_COLORS)

def rainbow_text(text):
    """Generate gradient-colored text for each log output."""
    color = next(color_iterator)
    return f"{color}{text}{Style.RESET_ALL}"

def log_with_prefix(message):
    """Log message with [ DVRKZ ] prefix and a gap."""
    brackets = Fore.LIGHTMAGENTA_EX + "[" + Style.RESET_ALL
    text = rainbow_text("DVRKZ")
    closing_bracket = Fore.LIGHTMAGENTA_EX + "]" + Style.RESET_ALL
    prefix = f"{brackets}{text}{closing_bracket}"
    print(f"{prefix}  {message}")

def read_config(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

def update_config_and_log_bad_account(config, account_line):
    with open(config, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    username = account_line.split(':')[0]
    
    data['accounts'] = [account for account in data['accounts'] if account['username'] != username]

    with open(config, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)

    with open('bad_accounts.txt', 'a', encoding='utf-8') as bad_file:
        bad_file.write(f"{ACCOUNT_FAILURE_MARK} {account_line}\n")

def extract_locale(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    script_tag = soup.find('script', string=re.compile(r'options\.bootstrap'))
    if script_tag:
        match = re.search(r"'locale':\s*'(\w+)'", script_tag.string)
        if match:
            return match.group(1)
    return "en-US"

def login(session, account):
    login_url = "https://www.kogama.com/auth/login"
    login_data = {
        'username': account['username'],
        'password': account['password']
    }

    login_page_response = session.get(login_url)
    locale = extract_locale(login_page_response.text)

    response = session.post(login_url, json=login_data)
    response_data = response.json()
    if response.status_code == 200 and "data" in response_data:
        return True
    else:
        error_message = response_data.get('message', '').lower()
        if 'invalid' in error_message or 'username' in error_message or 'password' in error_message:
            log_with_prefix(f"{Fore.MAGENTA}Invalid credentials for {account['username']}, logging as failed and removing from list{Style.RESET_ALL}")
            update_config_and_log_bad_account('config.json', f"{account['username']}:{account['password']}")
        else:
            log_with_prefix(f"{Fore.MAGENTA}Login failed for {account['username']} due to API limits or other issues{Style.RESET_ALL}")
        return False

def logout(session):
    logout_url = "https://www.kogama.com/auth/logout"

    response = session.get(logout_url)
    if response.status_code != 200:
        response = session.post(logout_url)
    
    if response.status_code != 200:
        log_with_prefix(f"{Fore.MAGENTA}Failed to log out{Style.RESET_ALL}")

def post_comment(session, account, target_id, comment_content):
    comment_url = f"https://www.kogama.com/game/{target_id}/comment/"
    comment_data = {
        'comment': comment_content
    }
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json'
    }
    response = session.post(comment_url, json=comment_data, headers=headers)
    
    if response.status_code == 201:
        log_with_prefix(f"{Fore.MAGENTA}Sent comment from {Fore.RESET}{account['username']}{Fore.MAGENTA} under game/{Fore.LIGHTCYAN_EX}{target_id}{Style.RESET_ALL}")
        return True
    else:
        log_with_prefix(f"{Fore.MAGENTA}Failed to send comment from {account['username']}{Style.RESET_ALL}")
        return False

def calculate_remaining_time(start_time, total_comments_needed, comments_posted):
    elapsed_time = datetime.now() - start_time
    average_time_per_comment = elapsed_time / comments_posted if comments_posted > 0 else timedelta(seconds=0)
    remaining_comments = total_comments_needed - comments_posted
    remaining_time = average_time_per_comment * remaining_comments
    return str(timedelta(seconds=remaining_time.total_seconds()))

def main():
    config = read_config('config.json')
    accounts = config['accounts']
    presets = config['presets']
    game_ids = config['gamelist']
    total_comments_needed = int(input("Provide amount of comments per game: "))

    start_time = datetime.now()
    comments_posted = 0

    for target_id in game_ids:
        comments_posted_for_game = 0

        while comments_posted_for_game < total_comments_needed:
            for account in accounts:
                session = requests.Session()
                logged_in = login(session, account)
                
                if logged_in:
                    comments_for_account = 0
                    
                    comment_content = presets.get(account['username'], None)
                    if not comment_content:
                        log_with_prefix(f"{Fore.MAGENTA}No preset comment found for {account['username']}{Style.RESET_ALL}")
                        continue

                    while comments_for_account < COMMENTS_PER_ACCOUNT and comments_posted_for_game < total_comments_needed:
                        if post_comment(session, account, target_id, comment_content):
                            comments_posted_for_game += 1
                            comments_posted += 1
                            comments_for_account += 1
                        time.sleep(COMMENT_DELAY)  
                    
                    logout(session)
                    time.sleep(LOGIN_LOGOUT_DELAY)  
                
                if comments_posted_for_game >= total_comments_needed:
                    break

            if comments_posted_for_game < total_comments_needed:
                log_with_prefix(f"{Fore.MAGENTA}Waiting for {REPROCESS_DELAY} seconds before reprocessing accounts...{Style.RESET_ALL}")
                time.sleep(REPROCESS_DELAY)
        
        estimated_time = calculate_remaining_time(start_time, total_comments_needed * len(game_ids), comments_posted)
        log_with_prefix(f"{Fore.MAGENTA}Estimated Time Remaining: {estimated_time}{Style.RESET_ALL}")

    log_with_prefix(f"{Fore.MAGENTA}Sent {comments_posted} comments across all games in the list.{Style.RESET_ALL}")

if __name__ == "__main__":
    main()
