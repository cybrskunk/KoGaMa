import colorama
from colorama import Fore, Style
import keyboard
import time
import sys
import os
import subprocess

colorama.init()

hotkey_dict = {}

# Check if requirements.txt exists
if os.path.exists('requirements.txt'):
    # Install dependencies
    print(f"{Fore.LIGHTRED_EX}Installing dependencies from requirements.txt...{Style.RESET_ALL}")
    subprocess.run(['pip', 'install', '-r', 'requirements.txt'])

    # Delete requirements.txt
    os.remove('requirements.txt')
    print(f"{Fore.LIGHTRED_EX}requirements.txt deleted after installation.{Style.RESET_ALL}")
print('  ')
print('  ')


print(f'{Fore.LIGHTRED_EX}Script created by Simon. ')
print('  ')


def set_text():
    global hotkey_dict

    animation = "|/-\\"
    for i in range(25):
        time.sleep(0.1)
        sys.stdout.write(f"\r[{animation[i % len(animation)]}]  {Fore.LIGHTRED_EX}Loading New Preset")
        sys.stdout.flush()

    while True:
        hotkey = input(f'\n{Fore.YELLOW}Enter a hotkey for the new preset:{Style.RESET_ALL} ')
        
        if '^T' in hotkey:
            print(f"\n{Fore.RED}Invalid input. Hotkey cannot contain '^T'.{Style.RESET_ALL}")
        elif hotkey in hotkey_dict:
            print(f"\n{Fore.RED}Hotkey already in use. Please choose a different one.{Style.RESET_ALL}")
        else:
            break

    text = input(f'{Fore.YELLOW}Enter text to be typed for the new preset:{Style.RESET_ALL} ')
    hotkey_dict[hotkey] = text

    sys.stdout.write("\033[K")  
    toggle_info = f'\n{Fore.GREEN}[ + ] Hotkey Added:{Style.RESET_ALL} {Fore.RED}toggle button:{Style.RESET_ALL} {Fore.LIGHTMAGENTA_EX}"{hotkey}":{Style.RESET_ALL} {Fore.LIGHTBLUE_EX}"{text}"'
    print(toggle_info)

    
    keyboard.press_and_release('Enter')

def type_text(hotkey):
    if hotkey in hotkey_dict:
        text_to_type = hotkey_dict[hotkey]
        
        keyboard.press_and_release('Ctrl+A')
        keyboard.press_and_release('Delete')
        keyboard.write(text_to_type)

        
        keyboard.press_and_release('Enter')

keyboard.add_hotkey('Ctrl+Shift', set_text)

for i in range(1, 10):  
    keyboard.add_hotkey(str(i), type_text, args=(str(i),))

try:
    while True:
        time.sleep(0.1)
except KeyboardInterrupt:
    pass
