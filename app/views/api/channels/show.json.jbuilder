json.channel do 
    json.extract! @channel, :name, :id
end 


json.messages do
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :author, :content
        end
    end
end 