class Message {
	constructor(a, m) {
		this.author = a;
		this.message = m;
	}
	static HTMLToMessage(element) {
		if (!element.children[0]) {
			console.error(element);
			badElements.push(element);
			return;
		}
		if (!element.children[0].children[1]) {
			console.error(element);
			badElements.push(element);
			return;
		}
		if (!element.children[0].children[1].children[0]) {
			console.error(element);
			badElements.push(element);
			return;
		}
		if (!element.children[0].children[1].children[0].children[0]) {
			console.error(element);
			badElements.push(element);
			return;
		}

		if (!element.children[1]) {
			console.error(element);
			badElements.push(element);
			return;
		}
		if (!element.children[1].children[0]) {
			console.error(element);
			badElements.push(element);
			return;
		}
		if (!element.children[1].children[0].children[1]) {
			console.error(element);
			badElements.push(element);
			return;
		}
		return new Message(
			element.children[0].children[1].children[0].children[0].innerText,
			element.children[1].children[0].children[1].innerText
		);
	}
}
var badElements = [];
var x = new Message('test', 'message');

var messageList = []; //Can I write to a file using Discord's libraries..? This is going to be gigantic.

var scrl = document.getElementsByClassName('messages-3amgkR scroller')[0];
// scrl.scrollTop = 0;
var arr = Array.from(
	document.getElementsByClassName('messageCozy-2JPAPA message-1PNnaP')
); //This class name can change. It was "body" and now it's "messageCozy-2JPAPA message-1PNnaP"

//The structure of a message change change often
//TODO: Find a way to determine structure of messages from the start then utilize that.
//messageCozy-2JPAPA message-1PNnaP - main body
//arr[0].children[0].children[1].children[0].children[0].innerText - username
//arr[0].children[1].children[0].children[1].innerText - message

//Mark each element with an HTML tag once you've read it.

// var keepLooking = true;
// var loop = 3;
// while (loop > 0) {
// 	var arr = Array.from(
// 		document.getElementsByClassName('messageCozy-2JPAPA message-1PNnaP')
// 	);
// 	arr.reverse().forEach(x => {
// 		if (x.hasBeenRead) return;
// 		var message = Message.HTMLToMessage(x);
// 		if (!message) return;
// 		console.log(message.author + ': ' + message.message);
// 		messageList.push(message);
// 		x.hasBeenRead = true;
// 	});
// 	scrl.scrollTop = 0;
// 	if (messageList.length > 100) keepLooking = false;
// 	loop -= 1;
// }

var keepLooking = true;
function grabCurrentMessages() {
	if (!keepLooking) return;

	var arr = Array.from(
		document.getElementsByClassName('messageCozy-2JPAPA message-1PNnaP')
	);
	arr.reverse().forEach(x => {
		if (x.hasBeenRead) return;
		var message = Message.HTMLToMessage(x);
		if (!message) return;
		console.log(message.author + ': ' + message.message);
		messageList.push(message);
		x.hasBeenRead = true;
	});
	scrl.scrollTop = 0;
	if (messageList.length > 10000) keepLooking = false;
	// loop -= 1;

	window.setTimeout(function() {
		grabCurrentMessages();
	}, 8000);
}

grabCurrentMessages();
