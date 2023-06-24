@messages.each do |message|
    json.set! message.id do 
        json.content message.content
        json.author_id message.author_id
        json.messageable_id message.messageable_id
        json.messageable_type message.messageable_type
    end
end 