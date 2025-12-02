import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace chat. */
export namespace chat {

    /** Properties of a WebSocketMessage. */
    interface IWebSocketMessage {

        /** WebSocketMessage requestId */
        requestId?: (string|null);

        /** WebSocketMessage signalMessage */
        signalMessage?: (chat.ISignalMessage|null);

        /** WebSocketMessage deliveryReceipt */
        deliveryReceipt?: (chat.IDeliveryReceipt|null);

        /** WebSocketMessage typingIndicator */
        typingIndicator?: (chat.ITypingIndicator|null);

        /** WebSocketMessage syncRequest */
        syncRequest?: (chat.ISyncRequest|null);

        /** WebSocketMessage syncResponse */
        syncResponse?: (chat.ISyncResponse|null);
    }

    /** Represents a WebSocketMessage. */
    class WebSocketMessage implements IWebSocketMessage {

        /**
         * Constructs a new WebSocketMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat.IWebSocketMessage);

        /** WebSocketMessage requestId. */
        public requestId: string;

        /** WebSocketMessage signalMessage. */
        public signalMessage?: (chat.ISignalMessage|null);

        /** WebSocketMessage deliveryReceipt. */
        public deliveryReceipt?: (chat.IDeliveryReceipt|null);

        /** WebSocketMessage typingIndicator. */
        public typingIndicator?: (chat.ITypingIndicator|null);

        /** WebSocketMessage syncRequest. */
        public syncRequest?: (chat.ISyncRequest|null);

        /** WebSocketMessage syncResponse. */
        public syncResponse?: (chat.ISyncResponse|null);

        /** WebSocketMessage payload. */
        public payload?: ("signalMessage"|"deliveryReceipt"|"typingIndicator"|"syncRequest"|"syncResponse");

        /**
         * Creates a new WebSocketMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WebSocketMessage instance
         */
        public static create(properties?: chat.IWebSocketMessage): chat.WebSocketMessage;

        /**
         * Encodes the specified WebSocketMessage message. Does not implicitly {@link chat.WebSocketMessage.verify|verify} messages.
         * @param message WebSocketMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat.IWebSocketMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WebSocketMessage message, length delimited. Does not implicitly {@link chat.WebSocketMessage.verify|verify} messages.
         * @param message WebSocketMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat.IWebSocketMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat.WebSocketMessage;

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat.WebSocketMessage;

        /**
         * Verifies a WebSocketMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WebSocketMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WebSocketMessage
         */
        public static fromObject(object: { [k: string]: any }): chat.WebSocketMessage;

        /**
         * Creates a plain object from a WebSocketMessage message. Also converts values to other types if specified.
         * @param message WebSocketMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat.WebSocketMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WebSocketMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WebSocketMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SignalMessage. */
    interface ISignalMessage {

        /** SignalMessage recipientId */
        recipientId?: (string|null);

        /** SignalMessage ciphertext */
        ciphertext?: (Uint8Array|null);

        /** SignalMessage messageId */
        messageId?: (string|null);

        /** SignalMessage timestamp */
        timestamp?: (number|Long|null);

        /** SignalMessage senderId */
        senderId?: (string|null);
    }

    /** Represents a SignalMessage. */
    class SignalMessage implements ISignalMessage {

        /**
         * Constructs a new SignalMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat.ISignalMessage);

        /** SignalMessage recipientId. */
        public recipientId: string;

        /** SignalMessage ciphertext. */
        public ciphertext: Uint8Array;

        /** SignalMessage messageId. */
        public messageId: string;

        /** SignalMessage timestamp. */
        public timestamp: (number|Long);

        /** SignalMessage senderId. */
        public senderId: string;

        /**
         * Creates a new SignalMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignalMessage instance
         */
        public static create(properties?: chat.ISignalMessage): chat.SignalMessage;

        /**
         * Encodes the specified SignalMessage message. Does not implicitly {@link chat.SignalMessage.verify|verify} messages.
         * @param message SignalMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat.ISignalMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SignalMessage message, length delimited. Does not implicitly {@link chat.SignalMessage.verify|verify} messages.
         * @param message SignalMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat.ISignalMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SignalMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SignalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat.SignalMessage;

        /**
         * Decodes a SignalMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SignalMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat.SignalMessage;

        /**
         * Verifies a SignalMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SignalMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SignalMessage
         */
        public static fromObject(object: { [k: string]: any }): chat.SignalMessage;

        /**
         * Creates a plain object from a SignalMessage message. Also converts values to other types if specified.
         * @param message SignalMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat.SignalMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SignalMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SignalMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DeliveryReceipt. */
    interface IDeliveryReceipt {

        /** DeliveryReceipt messageId */
        messageId?: (string|null);

        /** DeliveryReceipt senderId */
        senderId?: (string|null);

        /** DeliveryReceipt timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents a DeliveryReceipt. */
    class DeliveryReceipt implements IDeliveryReceipt {

        /**
         * Constructs a new DeliveryReceipt.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat.IDeliveryReceipt);

        /** DeliveryReceipt messageId. */
        public messageId: string;

        /** DeliveryReceipt senderId. */
        public senderId: string;

        /** DeliveryReceipt timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new DeliveryReceipt instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeliveryReceipt instance
         */
        public static create(properties?: chat.IDeliveryReceipt): chat.DeliveryReceipt;

        /**
         * Encodes the specified DeliveryReceipt message. Does not implicitly {@link chat.DeliveryReceipt.verify|verify} messages.
         * @param message DeliveryReceipt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat.IDeliveryReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeliveryReceipt message, length delimited. Does not implicitly {@link chat.DeliveryReceipt.verify|verify} messages.
         * @param message DeliveryReceipt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat.IDeliveryReceipt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeliveryReceipt message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeliveryReceipt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat.DeliveryReceipt;

        /**
         * Decodes a DeliveryReceipt message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeliveryReceipt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat.DeliveryReceipt;

        /**
         * Verifies a DeliveryReceipt message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeliveryReceipt message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeliveryReceipt
         */
        public static fromObject(object: { [k: string]: any }): chat.DeliveryReceipt;

        /**
         * Creates a plain object from a DeliveryReceipt message. Also converts values to other types if specified.
         * @param message DeliveryReceipt
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat.DeliveryReceipt, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeliveryReceipt to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DeliveryReceipt
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a TypingIndicator. */
    interface ITypingIndicator {

        /** TypingIndicator conversationId */
        conversationId?: (string|null);

        /** TypingIndicator isTyping */
        isTyping?: (boolean|null);
    }

    /** Represents a TypingIndicator. */
    class TypingIndicator implements ITypingIndicator {

        /**
         * Constructs a new TypingIndicator.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat.ITypingIndicator);

        /** TypingIndicator conversationId. */
        public conversationId: string;

        /** TypingIndicator isTyping. */
        public isTyping: boolean;

        /**
         * Creates a new TypingIndicator instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TypingIndicator instance
         */
        public static create(properties?: chat.ITypingIndicator): chat.TypingIndicator;

        /**
         * Encodes the specified TypingIndicator message. Does not implicitly {@link chat.TypingIndicator.verify|verify} messages.
         * @param message TypingIndicator message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat.ITypingIndicator, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TypingIndicator message, length delimited. Does not implicitly {@link chat.TypingIndicator.verify|verify} messages.
         * @param message TypingIndicator message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat.ITypingIndicator, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TypingIndicator message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TypingIndicator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat.TypingIndicator;

        /**
         * Decodes a TypingIndicator message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TypingIndicator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat.TypingIndicator;

        /**
         * Verifies a TypingIndicator message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TypingIndicator message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TypingIndicator
         */
        public static fromObject(object: { [k: string]: any }): chat.TypingIndicator;

        /**
         * Creates a plain object from a TypingIndicator message. Also converts values to other types if specified.
         * @param message TypingIndicator
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat.TypingIndicator, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TypingIndicator to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TypingIndicator
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SyncRequest. */
    interface ISyncRequest {

        /** SyncRequest lastMessageId */
        lastMessageId?: (string|null);

        /** SyncRequest limit */
        limit?: (number|null);
    }

    /** Represents a SyncRequest. */
    class SyncRequest implements ISyncRequest {

        /**
         * Constructs a new SyncRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat.ISyncRequest);

        /** SyncRequest lastMessageId. */
        public lastMessageId: string;

        /** SyncRequest limit. */
        public limit: number;

        /**
         * Creates a new SyncRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncRequest instance
         */
        public static create(properties?: chat.ISyncRequest): chat.SyncRequest;

        /**
         * Encodes the specified SyncRequest message. Does not implicitly {@link chat.SyncRequest.verify|verify} messages.
         * @param message SyncRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat.ISyncRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncRequest message, length delimited. Does not implicitly {@link chat.SyncRequest.verify|verify} messages.
         * @param message SyncRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat.ISyncRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat.SyncRequest;

        /**
         * Decodes a SyncRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat.SyncRequest;

        /**
         * Verifies a SyncRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncRequest
         */
        public static fromObject(object: { [k: string]: any }): chat.SyncRequest;

        /**
         * Creates a plain object from a SyncRequest message. Also converts values to other types if specified.
         * @param message SyncRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat.SyncRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SyncRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SyncResponse. */
    interface ISyncResponse {

        /** SyncResponse messages */
        messages?: (chat.ISignalMessage[]|null);

        /** SyncResponse hasMore */
        hasMore?: (boolean|null);
    }

    /** Represents a SyncResponse. */
    class SyncResponse implements ISyncResponse {

        /**
         * Constructs a new SyncResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: chat.ISyncResponse);

        /** SyncResponse messages. */
        public messages: chat.ISignalMessage[];

        /** SyncResponse hasMore. */
        public hasMore: boolean;

        /**
         * Creates a new SyncResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncResponse instance
         */
        public static create(properties?: chat.ISyncResponse): chat.SyncResponse;

        /**
         * Encodes the specified SyncResponse message. Does not implicitly {@link chat.SyncResponse.verify|verify} messages.
         * @param message SyncResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: chat.ISyncResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncResponse message, length delimited. Does not implicitly {@link chat.SyncResponse.verify|verify} messages.
         * @param message SyncResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: chat.ISyncResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): chat.SyncResponse;

        /**
         * Decodes a SyncResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): chat.SyncResponse;

        /**
         * Verifies a SyncResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncResponse
         */
        public static fromObject(object: { [k: string]: any }): chat.SyncResponse;

        /**
         * Creates a plain object from a SyncResponse message. Also converts values to other types if specified.
         * @param message SyncResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: chat.SyncResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SyncResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
