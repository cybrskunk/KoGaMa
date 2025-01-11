# Script created by Simon
# DVRKZ DISTRIBUTION SWARM_DESCRIPTION_CHANGER
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
import itertools
import time
import threading
from queue import Queue
from colorama import Fore, Style

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

def read_config(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f).get('accounts', [])

def login(session, account):
    login_url = "https://www.kogama.com/auth/login"
    login_data = {'username': account['username'], 'password': account['password']}
    session.get(login_url)
    response = session.post(login_url, json=login_data)
    if response.status_code == 200 and "data" in response.json():
        return True
    return False

def get_profile_id(session):
    profile_url = "https://www.kogama.com/profile/me/"
    response = session.get(profile_url)
    if response.status_code == 200:
        profile_id = response.url.split('/')[-2]
        return profile_id
    return None

def update_description(session, profile_id, description):
    update_url = f"https://www.kogama.com/user/{profile_id}/"
    payload = {"birthdate": "1970-01-23", "description": description}
    response = session.put(update_url, json=payload)
    return response.status_code == 200

def logout(session):
    logout_url = "https://www.kogama.com/auth/logout"
    response = session.get(logout_url)
    if response.status_code != 200:
        session.post(logout_url)

def worker(queue, new_description, lock, batch_size, debounce_interval):
    count = 0
    while not queue.empty():
        account = queue.get()
        session = requests.Session()
        if login(session, account):
            profile_id = get_profile_id(session)
            if profile_id:
                if update_description(session, profile_id, new_description):
                    log_with_prefix(f"Updated description for account: {account['username']}")
                else:
                    log_with_prefix(f"Failed to update description for account: {account['username']}")
            else:
                log_with_prefix(f"Failed to get profile ID for account: {account['username']}")
            logout(session)
        else:
            log_with_prefix(f"Failed to login for account: {account['username']}")
        queue.task_done()
        count += 1
        if count % batch_size == 0:
            log_with_prefix(f"Processed {count} accounts, pausing for {debounce_interval} seconds")
            time.sleep(debounce_interval)

def main():
    config_accounts = read_config('config.json')
    print("Enter the new description for all accounts (use \\br for line breaks):")
    new_description = input().replace("\\br", "\n")
    
    queue = Queue()
    for account in config_accounts:
        queue.put(account)
    
    lock = threading.Lock()
    threads = []
    for _ in range(NUM_WORKERS):
        t = threading.Thread(target=worker, args=(queue, new_description, lock, BATCH_SIZE, DEBOUNCE_INTERVAL))
        t.start()
        threads.append(t)
    
    for t in threads:
        t.join()

if __name__ == "__main__":
    NUM_WORKERS = 1
    DEBOUNCE_INTERVAL = 111
    BATCH_SIZE = 10
    main()
