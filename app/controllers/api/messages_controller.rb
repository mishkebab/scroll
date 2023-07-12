class Api::MessagesController < ApplicationController
    def index
        # @messages = Message.where(ch)
        # render 'api/messages/index'
    end

    def show
        @message = Message.find(params[:id])
        render 'api/messages/show'
    end

    def create
        @message = Message.new(message_params)
        @message.author = current_user

        if !@message.save
            render json: @message.errors.full_messages, status: 422
        else
            if @message.messageable_type == "Channel"
                ChatChannel.broadcast_to @message.messageable,
                    type: 'RECEIVE_MESSAGE',
                    **from_template('api/messages/show', message: @message)
            else
                DmChannel.broadcast_to @message.messageable,
                    type: 'RECEIVE_MESSAGE',
                    **from_template('api/messages/show', message: @message)
            end
            render json: nil, status: :ok
        end
    end

    def update
        @message = current_user.messages.find(params[:id])

        if !@message.update(message_params)
            render json: @message.errors.full_messages, status: 422
        else
            if @message.messageable_type == "Channel"
                ChatChannel.broadcast_to @message.messageable, 
                    type: 'RECEIVE_MESSAGE',
                    **from_template('api/messages/show', message: @message)
            else
                DmChannel.broadcast_to @message.messageable,
                type: 'RECEIVE_MESSAGE',
                **from_template('api/messages/show', message: @message)
            end
            render json: nil, status: :ok
        end 
    end

    def destroy
        @message = current_user.messages.find(params[:id])
        @message.destroy
        if @message.messageable_type == "Channel"
            ChatChannel.broadcast_to @message.messageable, 
            type: 'DESTROY_MESSAGE',
            id: @message.id
        else
            DmChannel.broadcast_to @message.messageable,
            type: 'DESTROY_MESSAGE',
            id: @message.id
        end
        render json: nil, status: :ok
    end 

    private
    def message_params
        params.require(:message).permit(:content, :author_id, :messageable_type, :messageable_id)
    end 
end
