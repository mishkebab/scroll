json.array! @messages do |message|
    json.content message.content
    json.author_id message.author_id
    json.messageable_id message.messageable_id
    json.messageable_type message.messageable_type
end 