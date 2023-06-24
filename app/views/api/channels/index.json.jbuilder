@channels.each do |channel|
    json.set! channel.id do 
        json.id channel.id
        json.name channel.name
        json.owner_id channel.owner_id
        json.workspace_id channel.workspace_id
        json.description channel.description
    end
end 

