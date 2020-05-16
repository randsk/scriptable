# scriptable
Small scripts for use in the iOS 'scriptable' - https://apps.apple.com/us/app/scriptable/id1405459188

## trello-sync.js
1. Create tasks using Siri (or otherwise) in a specific reminder list on iOS
1. Run the script using Scriptable, or Shortcuts+Scriptable

Any reminders in the iOS list will be copied to your configured Trello board. Reminders transfered will be deleted. Script requires customisation with your trello API key and application tokens - see code:

* Get API key here: https://trello.com/app-key
* Get API token by generating one on the above page ("<i>...you can manually generate a *Token* </i>")
* 'idList' is the Trello id of the specific list you want to add items too. 
   * Get this by opening your favourite board, checking the URL for the 'BOARD_ID' - it'll be something like '3TKRKhMM':
   * Hit https://api.trello.com/1/board/[BOARD_ID]?cards=open&lists=open&checklists=all&key=[API_KEY]&token=[APP_TOKEN] in your browser (or curl)
   * Look for 'idList' property in the returned JSON for a card you know is in your list that you want to use
   



