class DmChannel < ApplicationCable::Channel
    def subscribed
        @dm = DirectMessage.find_by(id: params[:id])
        stream_for @dm
    end
end