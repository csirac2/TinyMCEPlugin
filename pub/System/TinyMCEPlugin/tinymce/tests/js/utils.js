function fontFace(face) {
	if (tinymce.isOpera) {
		return '&quot;' + face + '&quot;';
	} else {
		return face;
	}
}

function findContainer(selector) {
	var container;
	if (tinymce.is(selector, 'string')) {
		container = editor.dom.select(selector)[0];
	} else {
		container = selector;
	}
	if (container.firstChild) {
		container = container.firstChild;
	}
	return container;
}

function setSelection(startSelector, startOffset, endSelector, endOffset) {
	if (!endSelector) {
		endSelector = startSelector;
		endOffset = startOffset;
	}
	var startContainer = findContainer(startSelector);
	var endContainer = findContainer(endSelector);
	var rng = editor.dom.createRng();
	
	function setRange(container, offset, start) {
		if (offset === 'after') {
			if (start) {
				rng.setStartAfter(container);
			} else {
				rng.setEndAfter(container);
			}
			return;
		} else if (offset === 'afterNextCharacter') {
			container = container.nextSibling;
			offset = 1;
		}
		if (start) {
			rng.setStart(container, offset);
		} else {
			rng.setEnd(container, offset);
		}
	}
	setRange(startContainer, startOffset, true);
	setRange(endContainer, endOffset, false);
	editor.selection.setRng(rng);
}

function initWhenTinyAndRobotAreReady() {
	var readyCount = 0;
	function checkLoaded() {
		readyCount++;
		if (readyCount > 2) {
			ok(false, "Critical error: Received too many onload events.");
		} else if (readyCount === 2) {
			QUnit.start();
		}
	}
	window.robot.onload(checkLoaded);
	tinymce.onAddEditor.add(function(tinymce, ed) {
		ed.onInit.add(function() {
			checkLoaded();
		});
	});
}

function trimContent(content) {
	if (tinymce.isOpera)
		return content.replace(/^<p>&nbsp;<\/p>/, '').replace(/<p>&nbsp;<\/p>$/, '');

	return content;
}
