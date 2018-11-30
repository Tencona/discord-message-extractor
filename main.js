var badElements = [];
var messageList = []; //Can I write to a file using Discord's libraries..? This is going to be gigantic.

var scrl = document.getElementsByClassName('messages-3amgkR scroller')[0];
// scrl.scrollTop = 0;
var arr = Array.from(document.getElementsByClassName('markup-2BOw-j isCompact-1hsne1')); //This class name can change. It was "body" and now it's "markup-2BOw-j isCompact-1hsne1"

//Compact view structure
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

		if (!element.innerText) {
			console.error(element);
			badElements.push(element);
			return;
		}
		return new Message(element.children[0].children[1].children[0].innerText, element.innerText);
	}
}

var keepLooking = true;
function countMessages() {
	if (!keepLooking) return;

	var arr = Array.from(document.getElementsByClassName('markup-2BOw-j isCompact-1hsne1'));
	arr.reverse().forEach(x => {
		if (x.hasBeenRead) return;
		var message = Message.HTMLToMessage(x);
		if (!message) {
			keepLooking = false;
			console.error('Unable to make message');
		}
		// console.log(message.author + ': ' + message.message);
		messageList.push(message);
		x.hasBeenRead = true;
	});
	scrl.scrollTop = 0;
	if (messageList.length > 10000) {
		keepLooking = false;
		console.error('10,000+ messages');
	}
	// loop -= 1;

	window.setTimeout(function() {
		countMessages();
	}, 8000);
}

countMessages();

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
