//
// Use Siri 'remind me to ...' functionality to create tasks in
// a list called 'Trello'. On demand, from the Shortcuts app,
// sync reminder tasks to a specified list in trello, then delete 
// the reminder. 
//
// Requires API key and APP token from trello - see below
//
const REMINDER_LIST = "Trello"

//
// Get all calendars that can hold reminders
//
const calendars = await Calendar.forReminders()

//
// Find the reminder list we've called 'Trello', so we can sync it. Process
// any reminders in it
//
await calendars
           .filter(calendar => calendar.title === REMINDER_LIST)
           .map(trelloCalendar => processCalendar(trelloCalendar))


Script.complete();

//
// Process the reminder items in what ios calls a 'calendar'
//
async function processCalendar(cal) {
    console.log(`Processing list ${cal.title}`)
    
    //
    // Get all reminders in a calendar list
    //
    try {
        const reminders = await Reminder.all([cal]) 
   
        console.log(`Found ${reminders.length} reminders`)
        
        reminders.map(async (reminder) => {
            const result = await createOnTrello(reminder)
            
            if(result) {
                console.log(`Created card with URL ${result}`)
                reminder.remove()
                console.log("Reminder deleted")
            }
        })
    }
    catch(e) {
        console.log("Problem processing reminder/calendar list")
        console.log(e)  
    }
}

//
//
// Get this from https://trello.com/app-key
// 
const TRELLO_KEY = "<your key>"

//
// Get this from the above page, but generate a token
//
const TRELLO_TOKEN = "<your token>"

//
// https://api.trello.com/1/board/[BOARD_ID]?cards=open&lists=open&checklists=all&key=[TRELLO_KEY]&token=[TRELLO_TOKEN]
//
// Where BOARD_ID is from the url of your board. Grab the 'idList' of something in the list where you
// want your cards creating
//
const idList = "<your idList>"

//
// API URL to create cards
//
const createCardUrl = `https://api.trello.com/1/card?idList=${idList}&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
        
async function createOnTrello(rem) {
    console.log("Creating on Trello")
    
    const req = new Request(createCardUrl)
    req.method = 'POST'
    req.headers = {"Content-Type": "application/json"}
    
    req.body = JSON.stringify({
        name: rem.title, 
        idList: idList, 
        pos:"bottom"
    })
  

    console.log("POSTing task " +rem.title)
    const res = await req.loadJSON()
  
    return res.url
}
