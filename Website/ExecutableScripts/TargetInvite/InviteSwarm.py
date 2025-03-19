# Script created by Simon
# DVRKZ DISTRIBUTION MASS_TARGET_INVITE
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
import time
import itertools
from concurrent.futures import ThreadPoolExecutor, as_completed
from colorama import Fore, Style, init
import re

init()

RAINBOW_COLORS = [
    Fore.RED, Fore.LIGHTRED_EX, Fore.YELLOW, Fore.LIGHTYELLOW_EX,
    Fore.LIGHTGREEN_EX, Fore.CYAN, Fore.LIGHTCYAN_EX, Fore.BLUE,
    Fore.MAGENTA, Fore.LIGHTMAGENTA_EX
]

color_iterator = itertools.cycle(RAINBOW_COLORS)

def rainbow_text(text):
    color = next(color_iterator)
    return f"{color}{text}{Style.RESET_ALL}"

def log_with_prefix(message):
    brackets = Fore.LIGHTMAGENTA_EX + "[" + Style.RESET_ALL
    text = rainbow_text("DVRKZ")
    closing_bracket = Fore.LIGHTMAGENTA_EX + "]" + Style.RESET_ALL
    prefix = f"{brackets}{text}{closing_bracket}"
    print(f"{prefix}  {message}")

def read_config(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
        return data.get('accounts', [])

def login(session, account):
    login_url = "https://www.kogama.com/auth/login"
    login_data = {
        'username': account['username'],
        'password': account['password']
    }
    session.get(login_url)
    response = session.post(login_url, json=login_data)
    if response.status_code == 200 and "data" in response.json():
        return True
    return False

def get_profile_url(session):
    profile_url = "https://www.kogama.com/profile/me/"
    response = session.get(profile_url)
    if response.status_code == 200:
        return response.url
    return None

def send_friend_request(session, profile_url, target_user_id, username, self_id):
    friend_request_url = f"https://www.kogama.com/user/{self_id}/friend/"
    payload = {
        'user_id': target_user_id
    }
    headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8'
    }
    response = session.post(friend_request_url, json=payload, headers=headers)
    if response.status_code == 201:
        log_with_prefix(f"Sent friend request from {Fore.WHITE}{username}{Style.RESET_ALL} ({Fore.CYAN}{self_id}{Style.RESET_ALL}) to {Fore.LIGHTRED_EX}{target_user_id}{Style.RESET_ALL}")
    else:
        log_with_prefix(f"Failed to send friend request from {Fore.WHITE}{username}{Style.RESET_ALL} ({Fore.CYAN}{self_id}{Style.RESET_ALL}) to {Fore.LIGHTRED_EX}{target_user_id}{Style.RESET_ALL}. Status code: {response.status_code}")

def logout(session):
    logout_url = "https://www.kogama.com/auth/logout"
    response = session.get(logout_url)
    if response.status_code != 200:
        response = session.post(logout_url)
    if response.status_code != 200:
        log_with_prefix(f"{Fore.MAGENTA}Failed to log out{Style.RESET_ALL}")

def numeric_sort_key(username):
    match = re.search(r'(\d+)', username)
    if match:
        return int(match.group(1))
    return float('inf')

def process_account(account, target_user_id):
    try:
        with requests.Session() as session:
            if login(session, account):
                profile_url = get_profile_url(session)
                if profile_url:
                    self_id = profile_url.split('/')[-2]
                    send_friend_request(session, profile_url, target_user_id, account['username'], self_id)
                logout(session)
                return True
            return False
    except Exception as e:
        log_with_prefix(f"Error processing account {account['username']}: {str(e)}")
        return False

def process_accounts_batch(accounts, target_user_id, debounce_interval):
    success_count = 0
    with ThreadPoolExecutor(max_workers=4) as executor:
        future_to_account = {executor.submit(process_account, acc, target_user_id): acc for acc in accounts}
        for future in as_completed(future_to_account):
            result = future.result()
            if result:
                success_count += 1
            log_with_prefix(f"Processed {success_count} successful logins.")
    return success_count

def main():
    while True:
        try:
            target_user_id = int(input("Enter the target user ID: "))
            break
        except ValueError:
            print("Invalid input. Please enter a numeric user ID.")
    
    config_accounts = read_config('config.json')

    debounce_interval = 130
    batch_size = 10

    estimated_time = len(config_accounts) * 4
    log_with_prefix(f"Estimated time to process all accounts: {estimated_time} seconds")

    config_accounts.sort(key=lambda acc: numeric_sort_key(acc['username']))

    total_success_count = 0
    for i in range(0, len(config_accounts), batch_size):
        batch = config_accounts[i:i + batch_size]
        log_with_prefix(f"Processing batch {i // batch_size + 1} of {len(config_accounts) // batch_size + (1 if len(config_accounts) % batch_size > 0 else 0)}")
        success_count = process_accounts_batch(batch, target_user_id, debounce_interval)
        total_success_count += success_count

        if (i + batch_size) < len(config_accounts):
            log_with_prefix(f"Pausing for {debounce_interval} seconds to avoid API limits.")
            time.sleep(debounce_interval)

    log_with_prefix(f"Processing completed. Total successful logins: {total_success_count}")

if __name__ == "__main__":
    main()
