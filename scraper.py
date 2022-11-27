from __future__ import print_function

import json
import os.path
from apiclient import discovery
from google.oauth2 import service_account
from googleapiclient.errors import HttpError

"""
    Don't judge me. I don't know Python well.
"""

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
# This is necessary. Service worker with Google Sheets API access.
SERVICE_ACCOUNT_FILE = 'service_account.json'

# Safe because it's public anyway
SAMPLE_SPREADSHEET_ID = '1mUyCzlzDmdXMwaSTUgWXtEA45oJNn-iB4_bVM43zf58'
# Definitely a better way to do this... Oh well.
SAMPLE_RANGE_NAME = ['\'A ↑ \'!3:56',
                     '\'A →\'!3:56',
                     '\'A ↓\'!3:56',
                     '\'A ←\'!3:56',
                     '\'B ↑\'!3:40',
                     '\'B →\'!3:40',
                     '\'B ↓\'!3:40',
                     '\'B ←\'!3:40',
                     '\'C ↑\'!3:47',
                     '\'C →\'!3:48',
                     '\'C ↓\'!3:48',
                     '\'C ←\'!3:48',
                     '\'D ↑\'!3:56',
                     '\'D →\'!3:56',
                     '\'D ↓\'!3:56',
                     '\'D ←\'!3:56']

"""
    Sheet color object definitions
    
    There's probably a better way to do this.
"""
COLOR_OOB = {
    'red': 0.8509804,
    'green': 0.8509804,
    'blue': 0.8509804
}
COLOR_EMPTY = {
    'red': 1,
    'green': 1,
    'blue': 1
}
COLOR_BLOCK = {
    'red': 0.6,
    'green': 0.6,
    'blue': 0.6
}
COLOR_BOX = {
    'red': 0.91764706,
    'green': 0.6,
    'blue': 0.6
}
COLOR_SWORD = {
    'red': 0.62352943,
    'green': 0.77254903,
    'blue': 0.9098039
}
COLOR_SWORD_ALT = {
    'red': 0.6431373,
    'green': 0.7607843,
    'blue': 0.95686275
}
COLOR_CONF = {
    'red': 1,
    'blue': 1
}
COLOR_POT = {
    'red': 1,
    'green': 0.6
}
"""
    End color definitions
"""


def main():
    try:
        secret_file = os.path.join(os.getcwd(), SERVICE_ACCOUNT_FILE)
        credentials = service_account.Credentials.from_service_account_file(secret_file, scopes=SCOPES)
        service = discovery.build('sheets', 'v4', credentials=credentials)

        # Call the Sheets API
        include_grid_data = True
        sheet = service.spreadsheets()
        result = sheet.get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                           ranges=SAMPLE_RANGE_NAME,
                           includeGridData=include_grid_data).execute()
        if not result:
            print('No data found.')
            return

        # Manually extract background color data
        color_arr = []
        for sheet in result['sheets']:
            color_sheet = []
            for row in sheet['data'][0]['rowData']:
                color_row = []
                for cell in row['values']:
                    col = cell['effectiveFormat']['backgroundColor']
                    val = 0
                    if col == COLOR_OOB:
                        val = 0
                    elif col == COLOR_EMPTY:
                        val = 1
                    elif col == COLOR_BLOCK:
                        val = 2
                    elif col == COLOR_BOX:
                        val = 3
                    elif col == COLOR_SWORD:
                        val = 4
                    elif col == COLOR_SWORD_ALT:
                        val = 4
                    elif col == COLOR_CONF:
                        val = 5
                    elif col == COLOR_POT:
                        val = 6
                    else:
                        val = -1
                        print(col)
                    color_row.append(val)
                color_sheet.append(color_row)
            color_arr.append(color_sheet)

        # This whole section is fucked.
        # Not looking forward to fixing if it breaks.
        final_arr = []
        for c_sheet in color_arr:
            orientation = []
            current_boards = []
            repeat_empty_row = True
            current_board_index = 0
            current_board_row_index = 0
            for c_row in c_sheet:
                current_board_index = 0
                empty_row = True
                current_board_row = []
                current_board_row_written = False
                for elem in c_row:
                    if not elem == 0:
                        empty_row = False
                        repeat_empty_row = False
                        val = -1
                        if elem == 1:
                            val = 0
                        elif elem == 2:
                            val = 1
                        elif elem == 3:
                            val = 2
                        elif elem == 4:
                            val = 3
                        elif elem == 5:
                            val = 4
                        elif elem == 6:
                            val = 5
                        else:
                            val = -1
                        current_board_row.append(val)
                        current_board_row_written = False
                        # If you're actually reading through this, why?
                    else:
                        if not empty_row:
                            if not current_board_row_written:
                                if len(current_boards) < current_board_index + 1:
                                    current_boards.insert(current_board_index, [current_board_row])
                                else:
                                    current_boards[current_board_index].insert(current_board_row_index,
                                                                               current_board_row)
                                current_board_row_written = True
                                current_board_row = []
                                # This isn't worth your sanity.
                            current_board_index = current_board_index + 1
                if empty_row:
                    if not repeat_empty_row:
                        for board in current_boards:
                            orientation.append(board)
                        current_boards = []
                    repeat_empty_row = True
                    current_board_row_index = 0
                else:
                    current_board_row_index = current_board_row_index + 1
            if len(current_boards) > 0:
                for board in current_boards:
                    orientation.append(board)
            final_arr.append(orientation)

        with open("data.js", "w") as f:
            f.write("/*\n\tScraped and parsed automatically from\n\t"
                    "https://docs.google.com/spreadsheets/d/1mUyCzlzDmdXMwaSTUgWXtEA45oJNn-iB4_bVM43zf58"
                    "\n\tCredit to u/Ylandah on r/FFXIV for creating and maintaining the spreadsheet.\n\t"
                    "Thanks to them and all contributors for collating this information.\n\t"
                    "Scraped using Google Sheets API and parsed using Python.\n*/\n")
            f.write("const fhs_sheet_fox = ")
            json.dump(final_arr, f, separators=(",", ":"))

    except HttpError as err:
        print(err)


if __name__ == '__main__':
    main()
