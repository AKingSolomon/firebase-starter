/**
 * @TODO get a reference to the Firebase Database object
 */
  const database = firebase.database().ref()
/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */
  const allMessages = document.getElementById('all-messages');
  // const usernameInput = document.getElementById('username');
  const messageInput = document.getElementById('message');
  const sendBtn = document.getElementById('send-btn');
  const catMessages = document.getElementById('cat-messages')

  sendBtn.onclick = updateDB;
  /**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */


function updateDB(event) {
  // Prevent default refresh
  event.preventDefault();
  // Create data object
  let data = {
    // USERNAME: usernameInput.value,
    MESSAGE: messageInput.value,
  };
  
  console.log(data);
  
  // GET *PUSH* PUT DELETE
  // Write to our database
  database.push(data);

  messageInput.value = '';

  // addCatMessageToBoard();
}

/**
 * @TODO add the addMessageToBoard function as an event
 * handler for the "child_added" event on the database
 * object
 */
database.on('child_added', addMessageToBoard);
database.on('child_added', addCatMessageToBoard);

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  console.log(rowData);
  let data = rowData.val();
  let singleMessage = makeSingleMessageHTML(data.MESSAGE)
  allMessages.append(singleMessage);
}
function addCatMessageToBoard(){
  let singleCatMessage = makeCatMessageHTML()
  allMessages.append(singleCatMessage)
  return singleCatMessage
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(messageTxt) {
  // Create Parent Div
  let parentDiv = document.createElement('div');
  // Add Class name .single-message
  parentDiv.setAttribute('class', 'single-message')
  // Create Username P Tag
  // let usernameP = document.createElement('p');
  // // Append username
  // usernameP.classList.add('single-message-username');
  // usernameP.innerHTML = usernameTxt + ':';
  // parentDiv.append(usernameP);
  // Create message P Tag
  let messageP = document.createElement('p');
  messageP.innerHTML = messageTxt;
  
  parentDiv.append(messageP);
  // Return Parent Div
  return parentDiv;
}
function makeCatMessageHTML(){
  let parentDiv = document.createElement('div');
  parentDiv.setAttribute('class', 'cat-message');
  let catMessage = document.createElement('p');
  let num=Math.floor(Math.random()*5)
  let str = "🐈 |Meow"
  for(let i=0; i<=num; i++){
    str = str+" meow";
  }
  adds=['.','!','?']
  let rand=Math.floor(Math.random()*adds.length)
  str=str+adds[rand]
  catMessage.innerHTML = str;
  parentDiv.append(catMessage);
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */

let formElem = document.querySelector('form');
formElem.onkeyup = (event) => {
  //check if the key released is the enter key
  if(event.keyCode === 13){
    updateDB(event);
    event.preventDefault
  }
}
