const Message = ({ message }) => (
    <div className='message'>
        <div className='message__image'>
            <img src="/profile_placeholder.png" alt="Profile Placeholder" />
        </div>
        <div className='message__content'>
            <div className='message__text'>{message.message}</div>
            <div className='message__sender'>{message.name}</div>
        </div>
    </div>
);

export default Message;
