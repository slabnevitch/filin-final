function SplitLetters(selector, wrapper = "$", delimeter = "", joiner = "") {
		    	let nodeList = document.querySelectorAll(selector);

		    	function parseLetters(node) {
		    		let htmlNode = node.cloneNode();
		    		htmlNode.innerHTML = "";

		    		for (let i = 0; i < node.childNodes.length; i++) {
		    			let childNode = node.childNodes[i];
		    			if (childNode.nodeType === Node.TEXT_NODE) {
		    				htmlNode.innerHTML += childNode.data 
		    				.split(delimeter)
		    				.map(function(letter) {
		    					if (letter === " ") {
		    						return letter;
		    					}
		    					else {
		    						return wrapper.replace(/\$/g, letter);
		    					}
		    				})
		    				.join(joiner);
		    			}
		    			else {
		    				htmlNode.appendChild(parseLetters(childNode));
		    			}
		    		}

		    		return htmlNode;
		    	}

		    	for (let i = 0; i < nodeList.length; i++) {
		    		nodeList[i].innerHTML = parseLetters(nodeList[i]).innerHTML;
		    	}
		    }

		// end split letters
				SplitLetters(".header h1.header-text-animation", "<span class=\"letter\">$</span>", "", "");
		  	SplitLetters(".headet-left__subtitle.header-text-animation", "<span class=\"letter\">$</span>", "", "");
		  	SplitLetters(".header-slogan.header-text-animation", "<span class=\"letter\">$</span>", "", "");
				

				var tl = new TimelineMax();

				tl.staggerFromTo('header h1 .letter, .headet-left__subtitle .letter, .header-slogan .letter', .5, {x:20, opacity: 0}, {x: 0, opacity: 1}, 0.08);