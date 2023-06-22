class Api::ChannelsController < ApplicationController

    def index
        @channels = Channel.all
        render '/api/channels/index'
    end

    def show
        @channel = Channel.find(params[:id])
        render '/api/channels/show'
    end 

    private
    def channel_params
        params.require(:channel).permit(:name, :description)
    end 
end
