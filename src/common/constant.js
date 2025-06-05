/*
 * Copyright (c) Omnissa, LLC. All rights reserved.
 * This product is protected by copyright and intellectual property laws in the
 * United States and other countries as well as by international treaties.
 * -- Omnissa Restricted
 */

export const MessageType = {
	ERROR: 50,
	LOGIN: 200,
	CALL_CTRL: 201,
	TEXT_MSG: 202,
	SIGNALING: 203
};

if (typeof module === 'object' && module.exports) {
	module.exports = MessageType;
} else if (typeof window !== 'undefined') {
	window.commonMsgType = MessageType;
}
