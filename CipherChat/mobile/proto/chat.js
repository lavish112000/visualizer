/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.chat = (function() {

    /**
     * Namespace chat.
     * @exports chat
     * @namespace
     */
    var chat = {};

    chat.WebSocketMessage = (function() {

        /**
         * Properties of a WebSocketMessage.
         * @memberof chat
         * @interface IWebSocketMessage
         * @property {string|null} [requestId] WebSocketMessage requestId
         * @property {chat.ISignalMessage|null} [signalMessage] WebSocketMessage signalMessage
         * @property {chat.IDeliveryReceipt|null} [deliveryReceipt] WebSocketMessage deliveryReceipt
         * @property {chat.ITypingIndicator|null} [typingIndicator] WebSocketMessage typingIndicator
         * @property {chat.ISyncRequest|null} [syncRequest] WebSocketMessage syncRequest
         * @property {chat.ISyncResponse|null} [syncResponse] WebSocketMessage syncResponse
         */

        /**
         * Constructs a new WebSocketMessage.
         * @memberof chat
         * @classdesc Represents a WebSocketMessage.
         * @implements IWebSocketMessage
         * @constructor
         * @param {chat.IWebSocketMessage=} [properties] Properties to set
         */
        function WebSocketMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WebSocketMessage requestId.
         * @member {string} requestId
         * @memberof chat.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.requestId = "";

        /**
         * WebSocketMessage signalMessage.
         * @member {chat.ISignalMessage|null|undefined} signalMessage
         * @memberof chat.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.signalMessage = null;

        /**
         * WebSocketMessage deliveryReceipt.
         * @member {chat.IDeliveryReceipt|null|undefined} deliveryReceipt
         * @memberof chat.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.deliveryReceipt = null;

        /**
         * WebSocketMessage typingIndicator.
         * @member {chat.ITypingIndicator|null|undefined} typingIndicator
         * @memberof chat.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.typingIndicator = null;

        /**
         * WebSocketMessage syncRequest.
         * @member {chat.ISyncRequest|null|undefined} syncRequest
         * @memberof chat.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.syncRequest = null;

        /**
         * WebSocketMessage syncResponse.
         * @member {chat.ISyncResponse|null|undefined} syncResponse
         * @memberof chat.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.syncResponse = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * WebSocketMessage payload.
         * @member {"signalMessage"|"deliveryReceipt"|"typingIndicator"|"syncRequest"|"syncResponse"|undefined} payload
         * @memberof chat.WebSocketMessage
         * @instance
         */
        Object.defineProperty(WebSocketMessage.prototype, "payload", {
            get: $util.oneOfGetter($oneOfFields = ["signalMessage", "deliveryReceipt", "typingIndicator", "syncRequest", "syncResponse"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new WebSocketMessage instance using the specified properties.
         * @function create
         * @memberof chat.WebSocketMessage
         * @static
         * @param {chat.IWebSocketMessage=} [properties] Properties to set
         * @returns {chat.WebSocketMessage} WebSocketMessage instance
         */
        WebSocketMessage.create = function create(properties) {
            return new WebSocketMessage(properties);
        };

        /**
         * Encodes the specified WebSocketMessage message. Does not implicitly {@link chat.WebSocketMessage.verify|verify} messages.
         * @function encode
         * @memberof chat.WebSocketMessage
         * @static
         * @param {chat.IWebSocketMessage} message WebSocketMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WebSocketMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.requestId);
            if (message.signalMessage != null && Object.hasOwnProperty.call(message, "signalMessage"))
                $root.chat.SignalMessage.encode(message.signalMessage, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.deliveryReceipt != null && Object.hasOwnProperty.call(message, "deliveryReceipt"))
                $root.chat.DeliveryReceipt.encode(message.deliveryReceipt, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.typingIndicator != null && Object.hasOwnProperty.call(message, "typingIndicator"))
                $root.chat.TypingIndicator.encode(message.typingIndicator, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.syncRequest != null && Object.hasOwnProperty.call(message, "syncRequest"))
                $root.chat.SyncRequest.encode(message.syncRequest, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.syncResponse != null && Object.hasOwnProperty.call(message, "syncResponse"))
                $root.chat.SyncResponse.encode(message.syncResponse, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified WebSocketMessage message, length delimited. Does not implicitly {@link chat.WebSocketMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chat.WebSocketMessage
         * @static
         * @param {chat.IWebSocketMessage} message WebSocketMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WebSocketMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer.
         * @function decode
         * @memberof chat.WebSocketMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chat.WebSocketMessage} WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WebSocketMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat.WebSocketMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.requestId = reader.string();
                        break;
                    }
                case 2: {
                        message.signalMessage = $root.chat.SignalMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.deliveryReceipt = $root.chat.DeliveryReceipt.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.typingIndicator = $root.chat.TypingIndicator.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.syncRequest = $root.chat.SyncRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.syncResponse = $root.chat.SyncResponse.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chat.WebSocketMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chat.WebSocketMessage} WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WebSocketMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WebSocketMessage message.
         * @function verify
         * @memberof chat.WebSocketMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WebSocketMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.requestId != null && message.hasOwnProperty("requestId"))
                if (!$util.isString(message.requestId))
                    return "requestId: string expected";
            if (message.signalMessage != null && message.hasOwnProperty("signalMessage")) {
                properties.payload = 1;
                {
                    var error = $root.chat.SignalMessage.verify(message.signalMessage);
                    if (error)
                        return "signalMessage." + error;
                }
            }
            if (message.deliveryReceipt != null && message.hasOwnProperty("deliveryReceipt")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.chat.DeliveryReceipt.verify(message.deliveryReceipt);
                    if (error)
                        return "deliveryReceipt." + error;
                }
            }
            if (message.typingIndicator != null && message.hasOwnProperty("typingIndicator")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.chat.TypingIndicator.verify(message.typingIndicator);
                    if (error)
                        return "typingIndicator." + error;
                }
            }
            if (message.syncRequest != null && message.hasOwnProperty("syncRequest")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.chat.SyncRequest.verify(message.syncRequest);
                    if (error)
                        return "syncRequest." + error;
                }
            }
            if (message.syncResponse != null && message.hasOwnProperty("syncResponse")) {
                if (properties.payload === 1)
                    return "payload: multiple values";
                properties.payload = 1;
                {
                    var error = $root.chat.SyncResponse.verify(message.syncResponse);
                    if (error)
                        return "syncResponse." + error;
                }
            }
            return null;
        };

        /**
         * Creates a WebSocketMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chat.WebSocketMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.WebSocketMessage} WebSocketMessage
         */
        WebSocketMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.chat.WebSocketMessage)
                return object;
            var message = new $root.chat.WebSocketMessage();
            if (object.requestId != null)
                message.requestId = String(object.requestId);
            if (object.signalMessage != null) {
                if (typeof object.signalMessage !== "object")
                    throw TypeError(".chat.WebSocketMessage.signalMessage: object expected");
                message.signalMessage = $root.chat.SignalMessage.fromObject(object.signalMessage);
            }
            if (object.deliveryReceipt != null) {
                if (typeof object.deliveryReceipt !== "object")
                    throw TypeError(".chat.WebSocketMessage.deliveryReceipt: object expected");
                message.deliveryReceipt = $root.chat.DeliveryReceipt.fromObject(object.deliveryReceipt);
            }
            if (object.typingIndicator != null) {
                if (typeof object.typingIndicator !== "object")
                    throw TypeError(".chat.WebSocketMessage.typingIndicator: object expected");
                message.typingIndicator = $root.chat.TypingIndicator.fromObject(object.typingIndicator);
            }
            if (object.syncRequest != null) {
                if (typeof object.syncRequest !== "object")
                    throw TypeError(".chat.WebSocketMessage.syncRequest: object expected");
                message.syncRequest = $root.chat.SyncRequest.fromObject(object.syncRequest);
            }
            if (object.syncResponse != null) {
                if (typeof object.syncResponse !== "object")
                    throw TypeError(".chat.WebSocketMessage.syncResponse: object expected");
                message.syncResponse = $root.chat.SyncResponse.fromObject(object.syncResponse);
            }
            return message;
        };

        /**
         * Creates a plain object from a WebSocketMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chat.WebSocketMessage
         * @static
         * @param {chat.WebSocketMessage} message WebSocketMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WebSocketMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.requestId = "";
            if (message.requestId != null && message.hasOwnProperty("requestId"))
                object.requestId = message.requestId;
            if (message.signalMessage != null && message.hasOwnProperty("signalMessage")) {
                object.signalMessage = $root.chat.SignalMessage.toObject(message.signalMessage, options);
                if (options.oneofs)
                    object.payload = "signalMessage";
            }
            if (message.deliveryReceipt != null && message.hasOwnProperty("deliveryReceipt")) {
                object.deliveryReceipt = $root.chat.DeliveryReceipt.toObject(message.deliveryReceipt, options);
                if (options.oneofs)
                    object.payload = "deliveryReceipt";
            }
            if (message.typingIndicator != null && message.hasOwnProperty("typingIndicator")) {
                object.typingIndicator = $root.chat.TypingIndicator.toObject(message.typingIndicator, options);
                if (options.oneofs)
                    object.payload = "typingIndicator";
            }
            if (message.syncRequest != null && message.hasOwnProperty("syncRequest")) {
                object.syncRequest = $root.chat.SyncRequest.toObject(message.syncRequest, options);
                if (options.oneofs)
                    object.payload = "syncRequest";
            }
            if (message.syncResponse != null && message.hasOwnProperty("syncResponse")) {
                object.syncResponse = $root.chat.SyncResponse.toObject(message.syncResponse, options);
                if (options.oneofs)
                    object.payload = "syncResponse";
            }
            return object;
        };

        /**
         * Converts this WebSocketMessage to JSON.
         * @function toJSON
         * @memberof chat.WebSocketMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WebSocketMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WebSocketMessage
         * @function getTypeUrl
         * @memberof chat.WebSocketMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WebSocketMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chat.WebSocketMessage";
        };

        return WebSocketMessage;
    })();

    chat.SignalMessage = (function() {

        /**
         * Properties of a SignalMessage.
         * @memberof chat
         * @interface ISignalMessage
         * @property {string|null} [recipientId] SignalMessage recipientId
         * @property {Uint8Array|null} [ciphertext] SignalMessage ciphertext
         * @property {string|null} [messageId] SignalMessage messageId
         * @property {number|Long|null} [timestamp] SignalMessage timestamp
         * @property {string|null} [senderId] SignalMessage senderId
         */

        /**
         * Constructs a new SignalMessage.
         * @memberof chat
         * @classdesc Represents a SignalMessage.
         * @implements ISignalMessage
         * @constructor
         * @param {chat.ISignalMessage=} [properties] Properties to set
         */
        function SignalMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SignalMessage recipientId.
         * @member {string} recipientId
         * @memberof chat.SignalMessage
         * @instance
         */
        SignalMessage.prototype.recipientId = "";

        /**
         * SignalMessage ciphertext.
         * @member {Uint8Array} ciphertext
         * @memberof chat.SignalMessage
         * @instance
         */
        SignalMessage.prototype.ciphertext = $util.newBuffer([]);

        /**
         * SignalMessage messageId.
         * @member {string} messageId
         * @memberof chat.SignalMessage
         * @instance
         */
        SignalMessage.prototype.messageId = "";

        /**
         * SignalMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof chat.SignalMessage
         * @instance
         */
        SignalMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SignalMessage senderId.
         * @member {string} senderId
         * @memberof chat.SignalMessage
         * @instance
         */
        SignalMessage.prototype.senderId = "";

        /**
         * Creates a new SignalMessage instance using the specified properties.
         * @function create
         * @memberof chat.SignalMessage
         * @static
         * @param {chat.ISignalMessage=} [properties] Properties to set
         * @returns {chat.SignalMessage} SignalMessage instance
         */
        SignalMessage.create = function create(properties) {
            return new SignalMessage(properties);
        };

        /**
         * Encodes the specified SignalMessage message. Does not implicitly {@link chat.SignalMessage.verify|verify} messages.
         * @function encode
         * @memberof chat.SignalMessage
         * @static
         * @param {chat.ISignalMessage} message SignalMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignalMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.recipientId != null && Object.hasOwnProperty.call(message, "recipientId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.recipientId);
            if (message.ciphertext != null && Object.hasOwnProperty.call(message, "ciphertext"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.ciphertext);
            if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.messageId);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.timestamp);
            if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.senderId);
            return writer;
        };

        /**
         * Encodes the specified SignalMessage message, length delimited. Does not implicitly {@link chat.SignalMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chat.SignalMessage
         * @static
         * @param {chat.ISignalMessage} message SignalMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SignalMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SignalMessage message from the specified reader or buffer.
         * @function decode
         * @memberof chat.SignalMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chat.SignalMessage} SignalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignalMessage.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat.SignalMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.recipientId = reader.string();
                        break;
                    }
                case 2: {
                        message.ciphertext = reader.bytes();
                        break;
                    }
                case 3: {
                        message.messageId = reader.string();
                        break;
                    }
                case 4: {
                        message.timestamp = reader.int64();
                        break;
                    }
                case 5: {
                        message.senderId = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SignalMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chat.SignalMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chat.SignalMessage} SignalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SignalMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SignalMessage message.
         * @function verify
         * @memberof chat.SignalMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SignalMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.recipientId != null && message.hasOwnProperty("recipientId"))
                if (!$util.isString(message.recipientId))
                    return "recipientId: string expected";
            if (message.ciphertext != null && message.hasOwnProperty("ciphertext"))
                if (!(message.ciphertext && typeof message.ciphertext.length === "number" || $util.isString(message.ciphertext)))
                    return "ciphertext: buffer expected";
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                if (!$util.isString(message.messageId))
                    return "messageId: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                if (!$util.isString(message.senderId))
                    return "senderId: string expected";
            return null;
        };

        /**
         * Creates a SignalMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chat.SignalMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.SignalMessage} SignalMessage
         */
        SignalMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.chat.SignalMessage)
                return object;
            var message = new $root.chat.SignalMessage();
            if (object.recipientId != null)
                message.recipientId = String(object.recipientId);
            if (object.ciphertext != null)
                if (typeof object.ciphertext === "string")
                    $util.base64.decode(object.ciphertext, message.ciphertext = $util.newBuffer($util.base64.length(object.ciphertext)), 0);
                else if (object.ciphertext.length >= 0)
                    message.ciphertext = object.ciphertext;
            if (object.messageId != null)
                message.messageId = String(object.messageId);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.senderId != null)
                message.senderId = String(object.senderId);
            return message;
        };

        /**
         * Creates a plain object from a SignalMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chat.SignalMessage
         * @static
         * @param {chat.SignalMessage} message SignalMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SignalMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.recipientId = "";
                if (options.bytes === String)
                    object.ciphertext = "";
                else {
                    object.ciphertext = [];
                    if (options.bytes !== Array)
                        object.ciphertext = $util.newBuffer(object.ciphertext);
                }
                object.messageId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.senderId = "";
            }
            if (message.recipientId != null && message.hasOwnProperty("recipientId"))
                object.recipientId = message.recipientId;
            if (message.ciphertext != null && message.hasOwnProperty("ciphertext"))
                object.ciphertext = options.bytes === String ? $util.base64.encode(message.ciphertext, 0, message.ciphertext.length) : options.bytes === Array ? Array.prototype.slice.call(message.ciphertext) : message.ciphertext;
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                object.messageId = message.messageId;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                object.senderId = message.senderId;
            return object;
        };

        /**
         * Converts this SignalMessage to JSON.
         * @function toJSON
         * @memberof chat.SignalMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SignalMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SignalMessage
         * @function getTypeUrl
         * @memberof chat.SignalMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SignalMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chat.SignalMessage";
        };

        return SignalMessage;
    })();

    chat.DeliveryReceipt = (function() {

        /**
         * Properties of a DeliveryReceipt.
         * @memberof chat
         * @interface IDeliveryReceipt
         * @property {string|null} [messageId] DeliveryReceipt messageId
         * @property {string|null} [senderId] DeliveryReceipt senderId
         * @property {number|Long|null} [timestamp] DeliveryReceipt timestamp
         */

        /**
         * Constructs a new DeliveryReceipt.
         * @memberof chat
         * @classdesc Represents a DeliveryReceipt.
         * @implements IDeliveryReceipt
         * @constructor
         * @param {chat.IDeliveryReceipt=} [properties] Properties to set
         */
        function DeliveryReceipt(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeliveryReceipt messageId.
         * @member {string} messageId
         * @memberof chat.DeliveryReceipt
         * @instance
         */
        DeliveryReceipt.prototype.messageId = "";

        /**
         * DeliveryReceipt senderId.
         * @member {string} senderId
         * @memberof chat.DeliveryReceipt
         * @instance
         */
        DeliveryReceipt.prototype.senderId = "";

        /**
         * DeliveryReceipt timestamp.
         * @member {number|Long} timestamp
         * @memberof chat.DeliveryReceipt
         * @instance
         */
        DeliveryReceipt.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new DeliveryReceipt instance using the specified properties.
         * @function create
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {chat.IDeliveryReceipt=} [properties] Properties to set
         * @returns {chat.DeliveryReceipt} DeliveryReceipt instance
         */
        DeliveryReceipt.create = function create(properties) {
            return new DeliveryReceipt(properties);
        };

        /**
         * Encodes the specified DeliveryReceipt message. Does not implicitly {@link chat.DeliveryReceipt.verify|verify} messages.
         * @function encode
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {chat.IDeliveryReceipt} message DeliveryReceipt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeliveryReceipt.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.messageId);
            if (message.senderId != null && Object.hasOwnProperty.call(message, "senderId"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.senderId);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified DeliveryReceipt message, length delimited. Does not implicitly {@link chat.DeliveryReceipt.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {chat.IDeliveryReceipt} message DeliveryReceipt message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeliveryReceipt.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeliveryReceipt message from the specified reader or buffer.
         * @function decode
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chat.DeliveryReceipt} DeliveryReceipt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeliveryReceipt.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat.DeliveryReceipt();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.messageId = reader.string();
                        break;
                    }
                case 2: {
                        message.senderId = reader.string();
                        break;
                    }
                case 3: {
                        message.timestamp = reader.int64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeliveryReceipt message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chat.DeliveryReceipt} DeliveryReceipt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeliveryReceipt.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeliveryReceipt message.
         * @function verify
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeliveryReceipt.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                if (!$util.isString(message.messageId))
                    return "messageId: string expected";
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                if (!$util.isString(message.senderId))
                    return "senderId: string expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a DeliveryReceipt message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.DeliveryReceipt} DeliveryReceipt
         */
        DeliveryReceipt.fromObject = function fromObject(object) {
            if (object instanceof $root.chat.DeliveryReceipt)
                return object;
            var message = new $root.chat.DeliveryReceipt();
            if (object.messageId != null)
                message.messageId = String(object.messageId);
            if (object.senderId != null)
                message.senderId = String(object.senderId);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a DeliveryReceipt message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {chat.DeliveryReceipt} message DeliveryReceipt
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeliveryReceipt.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.messageId = "";
                object.senderId = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                object.messageId = message.messageId;
            if (message.senderId != null && message.hasOwnProperty("senderId"))
                object.senderId = message.senderId;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            return object;
        };

        /**
         * Converts this DeliveryReceipt to JSON.
         * @function toJSON
         * @memberof chat.DeliveryReceipt
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeliveryReceipt.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeliveryReceipt
         * @function getTypeUrl
         * @memberof chat.DeliveryReceipt
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeliveryReceipt.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chat.DeliveryReceipt";
        };

        return DeliveryReceipt;
    })();

    chat.TypingIndicator = (function() {

        /**
         * Properties of a TypingIndicator.
         * @memberof chat
         * @interface ITypingIndicator
         * @property {string|null} [conversationId] TypingIndicator conversationId
         * @property {boolean|null} [isTyping] TypingIndicator isTyping
         */

        /**
         * Constructs a new TypingIndicator.
         * @memberof chat
         * @classdesc Represents a TypingIndicator.
         * @implements ITypingIndicator
         * @constructor
         * @param {chat.ITypingIndicator=} [properties] Properties to set
         */
        function TypingIndicator(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TypingIndicator conversationId.
         * @member {string} conversationId
         * @memberof chat.TypingIndicator
         * @instance
         */
        TypingIndicator.prototype.conversationId = "";

        /**
         * TypingIndicator isTyping.
         * @member {boolean} isTyping
         * @memberof chat.TypingIndicator
         * @instance
         */
        TypingIndicator.prototype.isTyping = false;

        /**
         * Creates a new TypingIndicator instance using the specified properties.
         * @function create
         * @memberof chat.TypingIndicator
         * @static
         * @param {chat.ITypingIndicator=} [properties] Properties to set
         * @returns {chat.TypingIndicator} TypingIndicator instance
         */
        TypingIndicator.create = function create(properties) {
            return new TypingIndicator(properties);
        };

        /**
         * Encodes the specified TypingIndicator message. Does not implicitly {@link chat.TypingIndicator.verify|verify} messages.
         * @function encode
         * @memberof chat.TypingIndicator
         * @static
         * @param {chat.ITypingIndicator} message TypingIndicator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TypingIndicator.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.conversationId != null && Object.hasOwnProperty.call(message, "conversationId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.conversationId);
            if (message.isTyping != null && Object.hasOwnProperty.call(message, "isTyping"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isTyping);
            return writer;
        };

        /**
         * Encodes the specified TypingIndicator message, length delimited. Does not implicitly {@link chat.TypingIndicator.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chat.TypingIndicator
         * @static
         * @param {chat.ITypingIndicator} message TypingIndicator message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TypingIndicator.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TypingIndicator message from the specified reader or buffer.
         * @function decode
         * @memberof chat.TypingIndicator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chat.TypingIndicator} TypingIndicator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TypingIndicator.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat.TypingIndicator();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.conversationId = reader.string();
                        break;
                    }
                case 2: {
                        message.isTyping = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TypingIndicator message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chat.TypingIndicator
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chat.TypingIndicator} TypingIndicator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TypingIndicator.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TypingIndicator message.
         * @function verify
         * @memberof chat.TypingIndicator
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TypingIndicator.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.conversationId != null && message.hasOwnProperty("conversationId"))
                if (!$util.isString(message.conversationId))
                    return "conversationId: string expected";
            if (message.isTyping != null && message.hasOwnProperty("isTyping"))
                if (typeof message.isTyping !== "boolean")
                    return "isTyping: boolean expected";
            return null;
        };

        /**
         * Creates a TypingIndicator message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chat.TypingIndicator
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.TypingIndicator} TypingIndicator
         */
        TypingIndicator.fromObject = function fromObject(object) {
            if (object instanceof $root.chat.TypingIndicator)
                return object;
            var message = new $root.chat.TypingIndicator();
            if (object.conversationId != null)
                message.conversationId = String(object.conversationId);
            if (object.isTyping != null)
                message.isTyping = Boolean(object.isTyping);
            return message;
        };

        /**
         * Creates a plain object from a TypingIndicator message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chat.TypingIndicator
         * @static
         * @param {chat.TypingIndicator} message TypingIndicator
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TypingIndicator.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.conversationId = "";
                object.isTyping = false;
            }
            if (message.conversationId != null && message.hasOwnProperty("conversationId"))
                object.conversationId = message.conversationId;
            if (message.isTyping != null && message.hasOwnProperty("isTyping"))
                object.isTyping = message.isTyping;
            return object;
        };

        /**
         * Converts this TypingIndicator to JSON.
         * @function toJSON
         * @memberof chat.TypingIndicator
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TypingIndicator.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TypingIndicator
         * @function getTypeUrl
         * @memberof chat.TypingIndicator
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TypingIndicator.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chat.TypingIndicator";
        };

        return TypingIndicator;
    })();

    chat.SyncRequest = (function() {

        /**
         * Properties of a SyncRequest.
         * @memberof chat
         * @interface ISyncRequest
         * @property {string|null} [lastMessageId] SyncRequest lastMessageId
         * @property {number|null} [limit] SyncRequest limit
         */

        /**
         * Constructs a new SyncRequest.
         * @memberof chat
         * @classdesc Represents a SyncRequest.
         * @implements ISyncRequest
         * @constructor
         * @param {chat.ISyncRequest=} [properties] Properties to set
         */
        function SyncRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncRequest lastMessageId.
         * @member {string} lastMessageId
         * @memberof chat.SyncRequest
         * @instance
         */
        SyncRequest.prototype.lastMessageId = "";

        /**
         * SyncRequest limit.
         * @member {number} limit
         * @memberof chat.SyncRequest
         * @instance
         */
        SyncRequest.prototype.limit = 0;

        /**
         * Creates a new SyncRequest instance using the specified properties.
         * @function create
         * @memberof chat.SyncRequest
         * @static
         * @param {chat.ISyncRequest=} [properties] Properties to set
         * @returns {chat.SyncRequest} SyncRequest instance
         */
        SyncRequest.create = function create(properties) {
            return new SyncRequest(properties);
        };

        /**
         * Encodes the specified SyncRequest message. Does not implicitly {@link chat.SyncRequest.verify|verify} messages.
         * @function encode
         * @memberof chat.SyncRequest
         * @static
         * @param {chat.ISyncRequest} message SyncRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.lastMessageId != null && Object.hasOwnProperty.call(message, "lastMessageId"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.lastMessageId);
            if (message.limit != null && Object.hasOwnProperty.call(message, "limit"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.limit);
            return writer;
        };

        /**
         * Encodes the specified SyncRequest message, length delimited. Does not implicitly {@link chat.SyncRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chat.SyncRequest
         * @static
         * @param {chat.ISyncRequest} message SyncRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SyncRequest message from the specified reader or buffer.
         * @function decode
         * @memberof chat.SyncRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chat.SyncRequest} SyncRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncRequest.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat.SyncRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.lastMessageId = reader.string();
                        break;
                    }
                case 2: {
                        message.limit = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SyncRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chat.SyncRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chat.SyncRequest} SyncRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncRequest message.
         * @function verify
         * @memberof chat.SyncRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.lastMessageId != null && message.hasOwnProperty("lastMessageId"))
                if (!$util.isString(message.lastMessageId))
                    return "lastMessageId: string expected";
            if (message.limit != null && message.hasOwnProperty("limit"))
                if (!$util.isInteger(message.limit))
                    return "limit: integer expected";
            return null;
        };

        /**
         * Creates a SyncRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chat.SyncRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.SyncRequest} SyncRequest
         */
        SyncRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.chat.SyncRequest)
                return object;
            var message = new $root.chat.SyncRequest();
            if (object.lastMessageId != null)
                message.lastMessageId = String(object.lastMessageId);
            if (object.limit != null)
                message.limit = object.limit | 0;
            return message;
        };

        /**
         * Creates a plain object from a SyncRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chat.SyncRequest
         * @static
         * @param {chat.SyncRequest} message SyncRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.lastMessageId = "";
                object.limit = 0;
            }
            if (message.lastMessageId != null && message.hasOwnProperty("lastMessageId"))
                object.lastMessageId = message.lastMessageId;
            if (message.limit != null && message.hasOwnProperty("limit"))
                object.limit = message.limit;
            return object;
        };

        /**
         * Converts this SyncRequest to JSON.
         * @function toJSON
         * @memberof chat.SyncRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SyncRequest
         * @function getTypeUrl
         * @memberof chat.SyncRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SyncRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chat.SyncRequest";
        };

        return SyncRequest;
    })();

    chat.SyncResponse = (function() {

        /**
         * Properties of a SyncResponse.
         * @memberof chat
         * @interface ISyncResponse
         * @property {Array.<chat.ISignalMessage>|null} [messages] SyncResponse messages
         * @property {boolean|null} [hasMore] SyncResponse hasMore
         */

        /**
         * Constructs a new SyncResponse.
         * @memberof chat
         * @classdesc Represents a SyncResponse.
         * @implements ISyncResponse
         * @constructor
         * @param {chat.ISyncResponse=} [properties] Properties to set
         */
        function SyncResponse(properties) {
            this.messages = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SyncResponse messages.
         * @member {Array.<chat.ISignalMessage>} messages
         * @memberof chat.SyncResponse
         * @instance
         */
        SyncResponse.prototype.messages = $util.emptyArray;

        /**
         * SyncResponse hasMore.
         * @member {boolean} hasMore
         * @memberof chat.SyncResponse
         * @instance
         */
        SyncResponse.prototype.hasMore = false;

        /**
         * Creates a new SyncResponse instance using the specified properties.
         * @function create
         * @memberof chat.SyncResponse
         * @static
         * @param {chat.ISyncResponse=} [properties] Properties to set
         * @returns {chat.SyncResponse} SyncResponse instance
         */
        SyncResponse.create = function create(properties) {
            return new SyncResponse(properties);
        };

        /**
         * Encodes the specified SyncResponse message. Does not implicitly {@link chat.SyncResponse.verify|verify} messages.
         * @function encode
         * @memberof chat.SyncResponse
         * @static
         * @param {chat.ISyncResponse} message SyncResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messages != null && message.messages.length)
                for (var i = 0; i < message.messages.length; ++i)
                    $root.chat.SignalMessage.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.hasMore);
            return writer;
        };

        /**
         * Encodes the specified SyncResponse message, length delimited. Does not implicitly {@link chat.SyncResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof chat.SyncResponse
         * @static
         * @param {chat.ISyncResponse} message SyncResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SyncResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SyncResponse message from the specified reader or buffer.
         * @function decode
         * @memberof chat.SyncResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {chat.SyncResponse} SyncResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncResponse.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.chat.SyncResponse();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.messages && message.messages.length))
                            message.messages = [];
                        message.messages.push($root.chat.SignalMessage.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        message.hasMore = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SyncResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof chat.SyncResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {chat.SyncResponse} SyncResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SyncResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SyncResponse message.
         * @function verify
         * @memberof chat.SyncResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SyncResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.messages != null && message.hasOwnProperty("messages")) {
                if (!Array.isArray(message.messages))
                    return "messages: array expected";
                for (var i = 0; i < message.messages.length; ++i) {
                    var error = $root.chat.SignalMessage.verify(message.messages[i]);
                    if (error)
                        return "messages." + error;
                }
            }
            if (message.hasMore != null && message.hasOwnProperty("hasMore"))
                if (typeof message.hasMore !== "boolean")
                    return "hasMore: boolean expected";
            return null;
        };

        /**
         * Creates a SyncResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof chat.SyncResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {chat.SyncResponse} SyncResponse
         */
        SyncResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.chat.SyncResponse)
                return object;
            var message = new $root.chat.SyncResponse();
            if (object.messages) {
                if (!Array.isArray(object.messages))
                    throw TypeError(".chat.SyncResponse.messages: array expected");
                message.messages = [];
                for (var i = 0; i < object.messages.length; ++i) {
                    if (typeof object.messages[i] !== "object")
                        throw TypeError(".chat.SyncResponse.messages: object expected");
                    message.messages[i] = $root.chat.SignalMessage.fromObject(object.messages[i]);
                }
            }
            if (object.hasMore != null)
                message.hasMore = Boolean(object.hasMore);
            return message;
        };

        /**
         * Creates a plain object from a SyncResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof chat.SyncResponse
         * @static
         * @param {chat.SyncResponse} message SyncResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SyncResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.messages = [];
            if (options.defaults)
                object.hasMore = false;
            if (message.messages && message.messages.length) {
                object.messages = [];
                for (var j = 0; j < message.messages.length; ++j)
                    object.messages[j] = $root.chat.SignalMessage.toObject(message.messages[j], options);
            }
            if (message.hasMore != null && message.hasOwnProperty("hasMore"))
                object.hasMore = message.hasMore;
            return object;
        };

        /**
         * Converts this SyncResponse to JSON.
         * @function toJSON
         * @memberof chat.SyncResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SyncResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SyncResponse
         * @function getTypeUrl
         * @memberof chat.SyncResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SyncResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/chat.SyncResponse";
        };

        return SyncResponse;
    })();

    return chat;
})();

module.exports = $root;
