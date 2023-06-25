@channels.each do |channel|
    json.set! channel.id do 
        json.id channel.id
        json.name channel.name
        json.owner_id channel.owner_id
        json.workspace_id channel.workspace_id
        json.description channel.description
        json.users channel.users do |user|
            json.set! user.id do
                json.id user.id
                json.display_name user.display_name
                json.title user.title
            end 
        end 
    end
end 



