class Api::ChannelSubscriptionsController < ApplicationController
    def create
        @channel_sub = ChannelSubscription.new(channel_sub_params)
        @channel_sub.user = current_user

        if !@channel_sub.save
            render json: @channel_sub.errors.full_messages, status: 422
        end 
    end

    def destroy
        # debugger
        @channel_sub = ChannelSubscription.find_by(user_id: current_user.id, channel_id: params[:id])
        @channel_sub.destroy 
    end 

    private
    def channel_sub_params
        params.require(:channel_sub).permit(:user_id, :channel_id)
    end 
end
