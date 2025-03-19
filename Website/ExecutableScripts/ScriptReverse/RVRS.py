import time
import requests
import os
import colorama
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import re
colorama.init(autoreset=True)
PRESET_FILTERS = [
    "webhooks",
    "discord",
    "discord.com/api",
    "discord.com/api/webhooks/",
    "pastebin",
    "token",
    "goods",
    "level",
    "gold",
    "kogama.com",
    "login",
    "password",
    "pass",
    "embeds",
    "email",
    "bot",
    "telegram",
    "guilded",
    "auth",
    "profile_id",
    "token",
    "planet_id",
    "username",
    "password",
    "auth_token",
    "api_key",
    "access_token",
    "client_secret",
    "client_id",
    "user_id",
    "session_id",
    "oauth_token",
    "refresh_token",
    "secret_key",
    "api_secret",
    "webhook_url",
    "api_url",
    "auth_code",
    "csrf_token",
    "jwt_token",
    "api_token",
    "bearer_token"
]

def print_credits():
    os.system('cls' if os.name == "nt" else "clear")
    print(colorama.Fore.RED + "RVRS")
    print(colorama.Fore.MAGENTA + "DVRKZ DISTRIBUTION BY VIN")

def check_hook(hook):
    try:
        info = requests.get(hook).text
        return "\"message\": \"Unknown Webhook\"" not in info
    except requests.RequestException:
        return False
def retrieve_webhook_info(hook):
    try:
        response = requests.get(hook).json()
        if response:
            return {
                "Name": response.get("name"),
                "Avatar URL": response.get("avatar"),
                "Last Message ID": response.get("last_message_id")
            }
        return "Could not retrieve webhook information."
    except requests.RequestException:
        return "Failed to retrieve webhook information."
def spam_and_delete(webhook, name, delay, amount, message, hook_deleter):
    counter = 0
    while True if amount == "inf" else counter < int(amount):
        try:
            data = requests.post(webhook, json={"content": str(message), "name": str(name),
                                                "avatar_url": "https://i.imgur.com/lk79Hlc.jpeg"})
            if data.status_code == 204:
                print(f"{colorama.Back.MAGENTA} {colorama.Fore.WHITE}[+] Sent{colorama.Back.RESET}")
            else:
                print(f"{colorama.Back.RED} {colorama.Fore.WHITE}[-] Fail{colorama.Back.RESET}")
        except Exception as e:
            print(f"{colorama.Fore.RED}Error: {str(e)}")
        time.sleep(float(delay))
        counter += 1
    if hook_deleter.lower() == "y":
        requests.delete(webhook)
        print(f'{colorama.Fore.MAGENTA}Webhook deleted')
    print(f'{colorama.Fore.GREEN}Done...')
def extract_url_from_js(js_file_path):
    directive_pattern = re.compile(r'@require\s+(\S+)')
    try:
        with open(js_file_path, 'r', encoding='utf-8') as file:
            js_content = file.read()
        matches = directive_pattern.findall(js_content)
        return matches
    except FileNotFoundError:
        return []
def fetch_content_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.RequestException:
        return None
def fetch_and_save_external_content(js_file_path, output_file):
    urls = extract_url_from_js(js_file_path)
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write("// Imported content\n")
        for url in urls:
            try:
                external_code = fetch_content_from_url(url)
                if external_code:
                    file.write(f"\n// Imported content from {url}\n")
                    file.write(external_code + "\n")
            except Exception as e:
                print(colorama.Fore.RED + f"Error fetching URL {url}: {e}")
    print(f"{colorama.Fore.GREEN}Import file saved as {output_file}")
def analyze_js(output_file):
    if not os.path.exists(output_file):
        print(colorama.Fore.RED + f"File {output_file} does not exist. Ensure deobfuscation was successful.")
        return
    with open(output_file, 'r', encoding='utf-8') as file:
        deobfuscated_code = file.read()
    found_matches = {}
    for pattern in PRESET_FILTERS:
        matches = [line for line in deobfuscated_code.splitlines() if pattern in line]
        if matches:
            found_matches[pattern] = matches
    os.system('cls' if os.name == "nt" else "clear")
    print_credits()
    if found_matches:
        print(colorama.Fore.MAGENTA + "\nFilter List Hits:")
        for pattern, matches in found_matches.items():
            print(colorama.Fore.GREEN + f"Pattern: {pattern}")
            for match in matches:
                print(colorama.Fore.CYAN + f"  {match}")
    else:
        print(colorama.Fore.RED + "No trigger words found in the script.")
def reverse_javascript():
    cache_dir = 'Cache'
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)

    import_file = os.path.join(cache_dir, "import.js")
    deobfuscated_file = os.path.join(cache_dir, "triggerhook.js")

    while True:
        Tk().withdraw()
        js_file_path = askopenfilename(title="Select a JavaScript file", filetypes=[("JavaScript files", "*.js")])
        if not js_file_path:
            print(colorama.Fore.RED + "No file selected. Exiting...")
            return
        
        fetch_and_save_external_content(js_file_path, import_file)
        os.system(f"obfuscator-io-deobfuscator {import_file} -o {deobfuscated_file}")
        analyze_js(deobfuscated_file)
        while True:
            action = input(colorama.Fore.MAGENTA + "\nType 'c' to continue to the main menu or 'e' to exit: ").strip().lower()
            if action == 'c':
                return
            elif action == 'e':
                exit()
            else:
                print(colorama.Fore.RED + "Invalid input. Please enter 'c' to continue or 'e' to exit.")
def webhook_utilities_menu():
    os.system('cls' if os.name == "nt" else "clear")
    print_credits()
    print(colorama.Fore.MAGENTA + "\nWebhook Utilities Menu:")
    print(colorama.Fore.MAGENTA + "1: Retrieve Information")
    print(colorama.Fore.MAGENTA + "2: Spam & Delete Webhook")

    choice = input("Enter your choice (1/2): ").strip()
    
    if choice == "1":
        webhook = input("Enter your webhook URL: ")
        if not check_hook(webhook):
            print(colorama.Fore.RED + "Invalid webhook URL. Exiting...")
            return
        
        info = retrieve_webhook_info(webhook)
        print(colorama.Fore.MAGENTA + "Webhook Information:")
        if isinstance(info, dict):
            for key, value in info.items():
                print(colorama.Fore.CYAN + f"{key}: {value}")
        else:
            print(colorama.Fore.RED + info)
        
        while True:
            action = input(colorama.Fore.MAGENTA + "\nType 'c' to continue to the main menu or 'e' to exit: ").strip().lower()
            if action == 'c':
                return
            elif action == 'e':
                exit()
            else:
                print(colorama.Fore.RED + "Invalid input. Please enter 'c' to continue or 'e' to exit.")
    
    elif choice == "2":
        webhook = input("Enter your webhook URL: ")
        name = input("Enter a webhook name: ")
        message = input("Enter a message: ")
        delay = input("Enter a delay [int/float]: ")
        amount = input("Enter an amount [int/inf]: ")
        hook_deleter = input("Delete webhook after spam? [Y/N]: ")
        
        if not check_hook(webhook):
            print(colorama.Fore.RED + "Invalid webhook URL. Exiting...")
            return
        
        try:
            delay = float(delay)
        except ValueError:
            print(colorama.Fore.RED + "Invalid delay value. Exiting...")
            return
        
        if not amount.isdigit() and amount != "inf":
            print(colorama.Fore.RED + "Invalid amount value. Exiting...")
            return
        
        if hook_deleter.lower() not in ["y", "n"]:
            print(colorama.Fore.RED + "Invalid hook_deleter value. Exiting...")
            return
        
        spam_and_delete(webhook, name, delay, amount, message, hook_deleter)
    
    else:
        print(colorama.Fore.RED + "Invalid choice. Exiting...")
def main_menu():
    while True:
        os.system('cls' if os.name == "nt" else "clear")
        print_credits()
        print(colorama.Fore.MAGENTA + "\nMain Menu:")
        print(colorama.Fore.MAGENTA + "1: Webhook Utilities")
        print(colorama.Fore.MAGENTA + "2: Reverse JavaScript")
        print(colorama.Fore.MAGENTA + "0: Exit")

        choice = input("Enter your choice (0/1/2): ").strip()
        
        if choice == "1":
            webhook_utilities_menu()
        elif choice == "2":
            reverse_javascript()
        elif choice == "0":
            print(colorama.Fore.GREEN + "Exiting...")
            exit()
        else:
            print(colorama.Fore.RED + "Invalid choice. Exiting...")

if __name__ == '__main__':
    os.system('title MemphisTools')
    main_menu()
