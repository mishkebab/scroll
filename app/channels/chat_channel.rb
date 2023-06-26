class ChatChannel < ApplicationCable::Channel
    def subscribed
        p params
        p "hello"
        @channel = Channel.first
        p @channel
        stream_for @channel
    end
end