import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div> 
        )
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">Đây là nơi bắt đầu cuộc trò chuyện của bạn.</p>
            <p className="channel-empty__second">Hãy nhắn tin bằng cách gửi tin nhắn, emoji hoặc GIF nhé!!</p>
        </div>
    )

    return (
        <div className=" channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
}

export default ChannelContainer;
