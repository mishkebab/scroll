json.array! @channels do |channel|
    json.name channel.name
    json.owner_id channel.owner_id
    json.workspace_id channel.workspace_id
    json.description channel.description
end 