class Api::ChannelsController < ApplicationController

    def index
        @channels = Workspace.find_by_id(params[:workspace_id]).channels
        render '/api/channels/index'
    end

    def show
        @channel = Channel.find(params[:id])
        render '/api/channels/show'
    end 

    def create
        @channel = Channel.new(channel_params)
        @channel.owner = current_user

        if !@channel.save
            render json: @channel.errors.full_messages, status: 422
        else
            render '/api/channels/show'
        end 
    end 

    def update
        @channel = Channel.find(params[:id])

        if !@channel.update(channel_params)
            render json: @message.errors.full_messages, status: 422
        else
            render '/api/channels/show'
        end 
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :description, :workspace_id)
    end 
end
